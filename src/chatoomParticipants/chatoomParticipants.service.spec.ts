import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomParticipantsService } from './chatoomParticipants.service';

describe('UsersService', () => {
	let service: ChatroomParticipantsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ChatroomParticipantsService]
		}).compile();

		service = module.get<ChatroomParticipantsService>(ChatroomParticipantsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
