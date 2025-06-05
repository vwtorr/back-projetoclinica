import { Test, TestingModule } from '@nestjs/testing';
import { PatientsExamsController } from './patients_exams.controller';
import { PatientsExamsService } from './patients_exams.service';

describe('PatientsExamsController', () => {
  let controller: PatientsExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsExamsController],
      providers: [PatientsExamsService],
    }).compile();

    controller = module.get<PatientsExamsController>(PatientsExamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
