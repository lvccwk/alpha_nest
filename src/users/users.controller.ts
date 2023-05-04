import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	Res,
	UseGuards,
	HttpStatus,
	Put,
	Logger,
	Request,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CookieSerializeOptions, serialize } from 'cookie';
import { Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import { JwtService } from '@nestjs/jwt';

// AWS S3 Upload
import { uploadToS3 } from '../../upload/aws-s3-upload';
import { FileInterceptor } from '@nestjs/platform-express/multer';

// Firebase
import { AuthGuard } from './auth.guard';
import {
	FacebookAuthProvider,
	getAuth,
	signInWithCustomToken,
	signInWithPopup
} from 'firebase/auth';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';

const firebaseConfig = {
	apiKey: 'AIzaSyAvdEYTLjjMFEvjGgtO2J-PWqCLMwKbaqA',
	authDomain: 'alpha-10854.firebaseapp.com',
	projectId: 'alpha-10854',
	storageBucket: 'alpha-10854.appspot.com',
	messagingSenderId: '365651135121',
	appId: '1:365651135121:web:ad185dec1d25a6254d8d30',
	measurementId: 'G-6FRM6XL9QS'
};

const serviceAccount = require('../../../alpha-10854-firebase-adminsdk-dr7fq-3fdb61cca5.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://alpha-10854-default-rtdb.asia-southeast1.firebasedatabase.app'
});
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new FacebookAuthProvider();

@ApiTags('users')
@Controller('users')
export class UsersController {
	logger = new Logger('HTTP');

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	@Post('/reg')
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@Get('/all')
	async findAll(@Request() req): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@UseGuards(AuthGuard)
	@Get('/')
	findOne(@Request() req: any) {
		return this.usersService.findOne(req.user.id);
	}

	@Get('/:id')
	findTheOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}
	@UseGuards(AuthGuard)
	@Put('/')
	update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(req.user.id, updateUserDto);
	}

	@UseGuards(AuthGuard)
	@Delete()
	remove(@Request() req: any) {
		return this.usersService.remove(req.user.id);
	}

	@Post('/register')
	async register(
		@Body()
		reqData: {
			user_type: string;
			username: string;
			email: string;
			password: string;
			image: string;
		}
	): Promise<any> {
		const user = await this.usersService.register({
			user_type: reqData.user_type,
			username: reqData.username,
			email: reqData.email,
			password: reqData.password,
			image: reqData.image
		});

		return user;
	}

	@Post('/login')
	async login(@Body() reqData: { email: string; password: string }): Promise<any> {
		console.log('reqData :', reqData);

		const token = await this.usersService.login({
			email: reqData.email,
			password: reqData.password
		});
		console.log('token :', token);

		return { token };
	}
	@Post('login/facebook')
	async loginFacebook(@Body() req: any, @Res() res: Response) {
		try {
			const token = await this.usersService.loginWithFacebook(req.code);
			return res.status(HttpStatus.OK).json({
				token: token
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
