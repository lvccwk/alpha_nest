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
// import * as cookieParser from 'cookie-parser';
import { Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import { JwtService } from '@nestjs/jwt';
// import { request } from 'http';

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
	// @UseGuards(JwtAuthGuard)

	// @UseGuards(AuthGuard('jwt'))
	@Get('/all')
	async findAll(@Request() req): Promise<User[]> {
		// const x = req.user.id;
		return await this.usersService.findAll();
	}

	// @UseGuards(AuthGuard('jwt'))
	@UseGuards(AuthGuard)
	@Get('/')
	findOne(@Request() req: any) {
		// return req.user;
		return this.usersService.findOne(req.user.id);
	}

	@UseGuards(AuthGuard)
	@Put('/')
	update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(req.user.id, updateUserDto);
	}

	@UseGuards(AuthGuard)
	@Delete('/:id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id);
		// return id;
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
		const user = await this.usersService.login({
			email: reqData.email,
			password: reqData.password
		});
		console.log('token :', user);

		// const payload = {
		// 	email: email,
		// 	password: user.password
		// };

		// const token = jwtSimple.encode(payload, process.env.JWT_SECRET);
		// console.log('token', token);

		return { data: user };

		// if (!user) {
		// 	// Create a user
		// }

		// const token = jwtSimple.encode(payLoad, jwt.jwtSecret);
		// console.log(token);
		// 1. Get a User.id, email, username by email

		// 2. Make a JWT
	}

	@Post('login/facebook')
	async loginFacebook(@Body() req: any, @Res() res: Response) {
		try {
			if (!req.code) {
				return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Wrong Code!' });
			}
			const { code } = req;
			const fetchResponse = await fetch(`https://graph.facebook.com/oauth/access_token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					client_id: `${process.env.FACEBOOK_CLIENT_ID}`,
					client_secret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
					code: `${code}`,
					redirect_uri: `${process.env.REACT_PUBLIC_HOSTNAME}/facebook-callback`
				})
			});
			const data = await fetchResponse.json();
			if (!data.access_token) {
				return res
					.status(HttpStatus.UNAUTHORIZED)
					.json({ msg: 'Failed to get access token!' });
			}
			const profileResponse = await fetch(
				`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.access_token}`
			);
			const profileData = await profileResponse.json();

			let user: User = await this.usersService.findByEmail(profileData.email);
			console.log({ profileData });
			if (!user) {
				user = await this.usersService.create({
					user_type: 'student',
					username: profileData.name,
					email: profileData.email,
					password: '',
					image: profileData.picture.data.url,
					is_deleted: false
				});
			}
			const payload = {
				id: user.id,
				username: user.username,
				email: user.email,
				image: user.image
			};
			console.log({
				payload
			});
			const token = jwtSimple.encode(payload, process.env.JWT_SECRET);
			console.log('token', token);

			// // Retrieve Firebase ID token for the user
			// const customToken = await admin.auth().createCustomToken(user.id.toString());
			// const auth = getAuth();
			// const { user: firebaseUser } = await signInWithCustomToken(auth, customToken);
			// const firebaseIdToken = await firebaseUser.getIdToken(/* forceRefresh */ true);

			// // Verify the Firebase ID token using Firebase Admin SDK
			// const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);
			// const uid = decodedToken.uid;

			// // Set the identifier and providers
			// const firebaseUserRecord = await admin.auth().getUser(uid);
			// const identifier =
			// 	firebaseUserRecord.email || firebaseUserRecord.phoneNumber || 'default@example.com';
			// const providers =
			// 	firebaseUserRecord.providerData.length > 0
			// 		? firebaseUserRecord.providerData.map((provider) => provider.providerId)
			// 		: ['password'];
			// console.log('uid', uid);
			// console.log('firebaseUserRecord', firebaseUserRecord);
			// console.log('identifier', identifier);
			// console.log('providers', providers);

			// console.log('firebaseIdToken', firebaseIdToken);

			return res.status(HttpStatus.OK).json({
				id: user.id,
				token: token
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}

	@Post('/file')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file, @Body() body, @Res() res: Response) {
		const fileName = file.originalname;
		try {
			// 	console.log('form');
			// 	const form: IncomingForm = initFormidable();
			// 	console.log('form1');

			// 	form.parse(req, async (err, fields, files) => {
			// 		req.body = fields;
			// 		// console.log({fields})
			// 		console.log({ files });

			// 		let file: File = Array.isArray(files.test123) ? files.test123[0] : files.test123;
			// 		let fileName = file ? file.newFilename : undefined;

			// 		// // Upload file to AWS S3

			// add timestamp in file name
			const accessPath = await uploadToS3({
				Bucket: 'alphafile',
				Key: `${fileName}`,
				ContentType: `${file.mimetype}`,
				Body: file.buffer
			});
			console.log(accessPath);
			res.json({ accessPath: accessPath });
			// 	});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
