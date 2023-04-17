import { Test, TestingModule } from '@nestjs/testing';
import { FollowedTeachersController } from './followedTeachers.controller';
import { FollowedTeachersService } from './followedTeachers.service';

describe('TeachersController', () => {
	let controller: FollowedTeachersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FollowedTeachersController],
			providers: [FollowedTeachersService]
		}).compile();

		controller = module.get<FollowedTeachersController>(FollowedTeachersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
