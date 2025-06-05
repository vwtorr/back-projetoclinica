import { Test, TestingModule } from '@nestjs/testing';
import { OpeningHoursService } from './opening-hours.service';

describe('OpeningHoursService', () => {
  let service: OpeningHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpeningHoursService],
    }).compile();

    service = module.get<OpeningHoursService>(OpeningHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
