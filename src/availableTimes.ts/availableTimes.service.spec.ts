import { Test, TestingModule } from '@nestjs/testing';
import { AvailableTimeService } from './availableTimes.service';

describe('UsersService', () => {
	let service: AvailableTimeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AvailableTimeService]
		}).compile();

		service = module.get<AvailableTimeService>(AvailableTimeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
