import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomHistorysController } from './chatroomHistorys.controller';
import { ChatroomHistorysService } from './chatroomHistorys.service';

describe('TeachersController', () => {
  let controller: ChatroomHistorysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomHistorysController],
      providers: [ChatroomHistorysService],
    }).compile();

    controller = module.get<ChatroomHistorysController>(
      ChatroomHistorysController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
