import { Test, TestingModule } from '@nestjs/testing';
import { PrivateMessagesController } from './privateMessages.controller';
import { PrivateMessagesService } from './privateMessages.service';

describe('TeachersController', () => {
  let controller: PrivateMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateMessagesController],
      providers: [PrivateMessagesService],
    }).compile();

    controller = module.get<PrivateMessagesController>(
      PrivateMessagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
