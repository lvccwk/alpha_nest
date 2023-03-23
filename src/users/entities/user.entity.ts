import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	isEmail,
	IsInt,
	IsNotEmpty,
	IsObject,
	IsPhoneNumber,
	IsString,
	MinLength
} from 'class-validator';
import { Cart } from 'src/carts/entities/carts.entity';
import { ChatroomParticipant } from 'src/chatoomParticipants/entities/chatoomParticipants.entity';
import { Chatroom } from 'src/chatrooms/entities/chatrooms.entity';
import { PrivateMessage } from 'src/privateMessages/entities/privateMessages.entity';
import { ProductRating } from 'src/productRatings/entities/productRatings.entity';
import { Product } from 'src/products/entities/products.entity';
import { PurchaseHistory } from 'src/purchaseHistorys/entities/purchaseHistorys.entity';
import { Subject } from 'src/subjects/entities/subjects.entity';
import { Teacher } from 'src/teachers/entities/teachers.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { BeforeInsert, Column } from 'typeorm';
import * as bcrypt from 'bcryptjs';
export class User {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 'teacher' })
	@IsString()
	@IsNotEmpty()
	user_type: string;

	@ApiProperty({ default: 'arfar' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ default: 'arfar@gmail.com' })
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ default: 'adminadmin' })
	@Column()
	password: string;

	// @BeforeInsert()
	// async hashPasword() {
	// 	this.password = await bcrypt.hash(this.password, 8);
	// }

	// async validatePassword(password: string): Promise<boolean> {
	// 	return bcrypt.compare(password, this.password);
	// }

	@ApiProperty({ default: 'admin.png' })
	@IsString()
	@IsNotEmpty()
	image: string;

	subject: Subject[];
	product: Product[];
	purchase_history: PurchaseHistory[];
	cart: Cart[];
	teacher: Teacher[];
	timetable: Timetable[];
	product_rating: ProductRating[];
	chatroom: Chatroom[];
	chatroom_participant: ChatroomParticipant[];
	private_message_from_user: PrivateMessage[];
	private_message_to_user: PrivateMessage[];
}
