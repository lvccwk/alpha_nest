import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomHistorysService } from './chatroomHistorys.service';

describe('UsersService', () => {
  let service: ChatroomHistorysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroomHistorysService],
    }).compile();

    service = module.get<ChatroomHistorysService>(ChatroomHistorysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
