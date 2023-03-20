import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHistorysService } from './purchaseHistorys.service';

describe('UsersService', () => {
  let service: PurchaseHistorysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseHistorysService],
    }).compile();

    service = module.get<PurchaseHistorysService>(PurchaseHistorysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
