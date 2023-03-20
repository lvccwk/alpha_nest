import { Test, TestingModule } from '@nestjs/testing';
import { ProductRatingsController } from './productRatings.controller';
import { ProductRatingsService } from './productRatings.service';

describe('TeachersController', () => {
	let controller: ProductRatingsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductRatingsController],
			providers: [ProductRatingsService]
		}).compile();

		controller = module.get<ProductRatingsController>(ProductRatingsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
