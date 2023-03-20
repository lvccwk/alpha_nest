import { Test, TestingModule } from '@nestjs/testing';
import { TimetablesController } from './timetable.controller';
import { TimetablesService } from './timetable.service';

describe('TeachersController', () => {
  let controller: TimetablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimetablesController],
      providers: [TimetablesService],
    }).compile();

    controller = module.get<TimetablesController>(TimetablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
