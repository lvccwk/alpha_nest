import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import * as jwtSimple from 'jwt-simple';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async create(createUserDto: CreateUserDto): Promise<Users> {
		try {
			let foundUser = await this.prisma.users.create({
				data: {
					user_type: createUserDto.user_type,
					username: createUserDto.username,
					email: createUserDto.email,
					password: createUserDto.password,
					cart: {
						create: {}
					}
				}
			});
			console.log(foundUser);
			return foundUser;
		} catch (e) {
			console.log(e);
		}
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.users.findMany({
			include: {
				followed_teachers: true,
				purchase_history: true,
				cart: { include: { cart_detail: { include: { product: true } } } },
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
	}

	async findByEmail(email: string) {
		let foundUser = await this.prisma.users.findUnique({
			where: { email }
		});
		// if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async findUnique(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				followed_teachers: { include: { teacher: true } }
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async findOne(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				teacher: true,
				followed_teachers: true,
				purchase_history: true,
				cart: { include: { cart_detail: { include: { product: true } } } },
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
				image: updateUserDto.image,
				is_deleted: updateUserDto.is_deleted
			}
		});
		if (foundUser) {
			console.log('yesUSER', foundUser);
		} else {
			console.log('noUSER');
		}
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

		console.log('login: ', user);
		if (user) {
			const payLoad = {
				id: user.id,
				email: user.email
			};
			const token = this.jwtService.sign(payLoad, {
				secret: process.env.JWT_SECRET
			});
			return token;
		}
		throw new NotFoundException('User not found!');
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

	async loginWithFacebook(code: string): Promise<string> {
		if (!code) {
			throw new UnauthorizedException('Wrong Code!');
		}
		const data = await this.getFacebookAccessToken(code);
		if (!data.access_token) {
			throw new UnauthorizedException('Failed to get access token!');
		}
		const profileData = await this.getFacebookProfileData(data.access_token);
		let user: User = await this.findByEmail(profileData.email);
		if (!user) {
			user = await this.create({
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
		const token = jwtSimple.encode(payload, process.env.JWT_SECRET);
		return token;
	}

	async getFacebookAccessToken(code: string): Promise<any> {
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
		return await fetchResponse.json();
	}

	async getFacebookProfileData(accessToken: string): Promise<any> {
		const profileResponse = await fetch(
			`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
		);
		return await profileResponse.json();
	}
}
