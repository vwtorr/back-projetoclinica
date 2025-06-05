import { Test, TestingModule } from '@nestjs/testing';
import { PatientsExamsService } from './patients_exams.service';

describe('PatientsExamsService', () => {
  let service: PatientsExamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsExamsService],
    }).compile();

    service = module.get<PatientsExamsService>(PatientsExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
