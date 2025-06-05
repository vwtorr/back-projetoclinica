import { Test, TestingModule } from '@nestjs/testing';
import { PatientsNotesController } from './patients_notes.controller';
import { PatientsNotesService } from './patients_notes.service';

describe('PatientsNotesController', () => {
  let controller: PatientsNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsNotesController],
      providers: [PatientsNotesService],
    }).compile();

    controller = module.get<PatientsNotesController>(PatientsNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
