import { Test, TestingModule } from '@nestjs/testing';
import { PatientsNotesService } from './patients_notes.service';

describe('PatientsNotesService', () => {
  let service: PatientsNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsNotesService],
    }).compile();

    service = module.get<PatientsNotesService>(PatientsNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
