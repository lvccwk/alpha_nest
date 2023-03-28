import { Test, TestingModule } from '@nestjs/testing';
import { TeacherSubjectsController } from './teacherSubjects.controller';
import { TeacherSubjectsService } from './teacherSubjects.service';

describe('TeachersController', () => {
	let controller: TeacherSubjectsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TeacherSubjectsController],
			providers: [TeacherSubjectsService]
		}).compile();

		controller = module.get<TeacherSubjectsController>(TeacherSubjectsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
