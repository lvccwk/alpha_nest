import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHistorysController } from './purchaseHistorys.controller';
import { PurchaseHistorysService } from './purchaseHistorys.service';

describe('TeachersController', () => {
  let controller: PurchaseHistorysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseHistorysController],
      providers: [PurchaseHistorysService],
    }).compile();

    controller = module.get<PurchaseHistorysController>(
      PurchaseHistorysController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
