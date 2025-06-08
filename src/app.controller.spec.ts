import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  // Opcional, mas útil para testes mais avançados
  let appService: AppService; 

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService); // Pegamos a instância do serviço
  });

  // 👇 Substitua o antigo bloco 'describe' por este
  describe('getInfo', () => {
    // 1. O nome do teste agora descreve a nova funcionalidade
    it('should return a status object with a date', () => {
      // 2. Chama o método correto no controller
      const result = appController.getInfo();

      // 3. Valida a estrutura do objeto retornado
      expect(result).toEqual({
        status: expect.any(String), // Verifica se 'status' é qualquer string
        date: expect.any(Date),     // Verifica se 'date' é uma instância de Date
      });
    });
  });
});