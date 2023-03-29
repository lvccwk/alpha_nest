import { Test, TestingModule } from '@nestjs/testing';
import { FollowedTeachersService } from './followedTeachers.service';

describe('UsersService', () => {
	let service: FollowedTeachersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FollowedTeachersService]
		}).compile();

		service = module.get<FollowedTeachersService>(FollowedTeachersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
