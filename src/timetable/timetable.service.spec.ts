import { Test, TestingModule } from '@nestjs/testing';
import { TimetablesService } from './timetable.service';

describe('UsersService', () => {
  let service: TimetablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimetablesService],
    }).compile();

    service = module.get<TimetablesService>(TimetablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
