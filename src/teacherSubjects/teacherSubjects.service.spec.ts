import { Test, TestingModule } from '@nestjs/testing';
import { TeacherSubjectsService } from './teacherSubjects.service';

describe('UsersService', () => {
	let service: TeacherSubjectsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TeacherSubjectsService]
		}).compile();

		service = module.get<TeacherSubjectsService>(TeacherSubjectsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
