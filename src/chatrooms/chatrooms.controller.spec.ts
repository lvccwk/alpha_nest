import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomController } from './chatrooms.controller';
import { ChatroomsService } from './chatrooms.service';

describe('TeachersController', () => {
  let controller: ChatroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomController],
      providers: [ChatroomsService],
    }).compile();

    controller = module.get<ChatroomController>(ChatroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
