import { Test, TestingModule } from '@nestjs/testing';
import { ChatoomParticipantsService } from './chatoomParticipants.service';

describe('UsersService', () => {
  let service: ChatoomParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatoomParticipantsService],
    }).compile();

    service = module.get<ChatoomParticipantsService>(
      ChatoomParticipantsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
