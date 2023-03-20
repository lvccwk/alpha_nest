import { Test, TestingModule } from '@nestjs/testing';
import { ChatoomParticipantsController } from './chatoomParticipants.controller';
import { ChatoomParticipantsService } from './chatoomParticipants.service';

describe('TeachersController', () => {
  let controller: ChatoomParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatoomParticipantsController],
      providers: [ChatoomParticipantsService],
    }).compile();

    controller = module.get<ChatoomParticipantsController>(
      ChatoomParticipantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
