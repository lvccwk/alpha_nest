import { Test, TestingModule } from '@nestjs/testing';
import { AvailableTimeController } from './availableTimes.controller';
import { AvailableTimeService } from './availableTimes.service';

describe('TeachersController', () => {
	let controller: AvailableTimeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AvailableTimeController],
			providers: [AvailableTimeService]
		}).compile();

		controller = module.get<AvailableTimeController>(AvailableTimeController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
