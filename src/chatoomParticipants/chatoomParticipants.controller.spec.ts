import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomParticipantsController } from './chatroomParticipants.controller';
import { ChatroomParticipantsService } from './chatroomParticipants.service';

describe('TeachersController', () => {
	let controller: ChatroomParticipantsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ChatroomParticipantsController],
			providers: [ChatroomParticipantsService]
		}).compile();

		controller = module.get<ChatroomParticipantsController>(ChatroomParticipantsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
