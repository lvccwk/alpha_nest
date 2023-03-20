import { Test, TestingModule } from '@nestjs/testing';
import { CartDetailsController } from './cartDetails.controller';
import { CartDetailsService } from './cartDetails.service';

describe('TeachersController', () => {
  let controller: CartDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartDetailsController],
      providers: [CartDetailsService],
    }).compile();

    controller = module.get<CartDetailsController>(CartDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
