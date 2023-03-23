import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import jwt from 'utils/jwt';
@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async create(createUserDto: CreateUserDto): Promise<string> {
		const saltOrRounds = 10;
		const password = createUserDto.password;
		const hash = await bcrypt.hash(password, saltOrRounds);
		let foundUser = await this.prisma.users.create({
			data: {
				user_type: createUserDto.user_type,
				username: createUserDto.username,
				email: createUserDto.email,
				password: createUserDto.password,
				image: createUserDto.image
			}
		});
		console.log(foundUser);

		return 'ok';
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.users.findMany({
			include: {
				subject: true,
				product: true,
				purchase_history: true,
				cart: true,
				teacher: true,
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
	}

	async findOne(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				subject: true,
				product: true,
				purchase_history: true,
				cart: true,
				teacher: true,
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		let foundUser = await this.prisma.users.update({
			where: { id },
			data: {
				user_type: updateUserDto.user_type,
				username: updateUserDto.username,
				email: updateUserDto.email,
				password: updateUserDto.password,
				image: updateUserDto.image
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return `#${id} user info has been updated`;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.users.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `#${id} user has been deleted`;
	}

	async login(data: { email: string; password: string }) {
		const user = await this.prisma.users.findFirst({
			where: data
		});

		if (user) {
			const payLoad = {
				id: user.id,
				username: user.username
			};
			const token = this.jwtService.sign(payLoad, {
				secret: jwt.jwtSecret
			});
			return token;
		}
		return '';
	}

	async register(data: {
		user_type: string;
		username: string;
		email: string;
		password: string;
		image: string;
	}) {
		return await this.prisma.users.create({
			data: {
				user_type: data.user_type,
				username: data.username,
				email: data.email,
				password: data.password,
				image: data.image
			}
		});
	}

	// async facebookLogin(){
	// 	try{
	//         if(!req.body.code){
	//             res.status(401).json({msg:"Wrong Code!"});
	//             return;
	//         }
	//         const { code } = req.body;
	//         const fetchResponse =await fetch(`https://graph.facebook.com/oauth/access_token`,{
	//             method : "POST",
	//             headers:{
	//                 "Content-Type": "application/x-www-form-urlencoded"
	//             },
	//             body: new URLSearchParams({
	//                 grant_type: 'authorization_code',
	//                 client_id: process.env.FACEBOOK_CLIENT_ID + "",
	//                 client_secret: process.env.FACEBOOK_CLIENT_SECRET + "",
	//                 code: code + "",
	//                 redirect_uri: `${process.env.REACT_PUBLIC_HOSTNAME}/facebook-callback`
	//             })
	//         });
	//         const data = await fetchResponse.json();
	//         if(!data.access_token){
	//             res.status(401).json({msg:"Failed to get access token!"});
	//             return ;
	//         }
	//         const profileResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.access_token}`);
	//         const profileData = await profileResponse.json();

	//         let user = (await this.authService.getUser(profileData.email));

	//         // Create a new user if the user does not exist
	//         if (!user) {
	//             user = (await this.authService.createUser(profileData.email));
	//         }
	//         const payload = {
	//             id: user.id,
	//             username: user.username
	//         };
	//         const token = jwtSimple.encode(payload, jwt.jwtSecret);
	//         res.json({
	//             username: user.username,
	//             token: token
	//         });
	//     }catch(e){
	//         res.status(500).json({msg:e.toString()})
	//     }
	// }
}
