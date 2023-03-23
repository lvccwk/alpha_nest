import { User } from 'src/users/entities/user.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserRegister extends OmitType(User, ['id', 'password'] as const) {
	user_type: string;
	// username: string;
	// email: string;
	// password: string;
	// image: string;
}
