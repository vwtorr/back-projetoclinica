import { Test, TestingModule } from '@nestjs/testing';
import { PositionsSalariesService } from './positions_salaries.service';

describe('PositionsSalariesService', () => {
  let service: PositionsSalariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionsSalariesService],
    }).compile();

    service = module.get<PositionsSalariesService>(PositionsSalariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
