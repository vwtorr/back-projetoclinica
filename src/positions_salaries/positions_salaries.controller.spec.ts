import { Test, TestingModule } from '@nestjs/testing';
import { PositionsSalariesController } from './positions_salaries.controller';
import { PositionsSalariesService } from './positions_salaries.service';

describe('PositionsSalariesController', () => {
  let controller: PositionsSalariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionsSalariesController],
      providers: [PositionsSalariesService],
    }).compile();

    controller = module.get<PositionsSalariesController>(PositionsSalariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
