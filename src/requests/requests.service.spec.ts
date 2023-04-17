import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './requests.service';

describe('UsersService', () => {
	let service: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RequestService]
		}).compile();

		service = module.get<RequestService>(RequestService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
