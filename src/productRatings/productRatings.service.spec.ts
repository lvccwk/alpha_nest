import { Test, TestingModule } from '@nestjs/testing';
import { CartDetailsService } from './productRatings.service';

describe('UsersService', () => {
  let service: CartDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartDetailsService],
    }).compile();

    service = module.get<CartDetailsService>(CartDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
