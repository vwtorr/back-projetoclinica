import { Controller, Get, Query } from '@nestjs/common';
import { CepService } from './cep.service';
import { Endereco } from './cep.service'; 

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get()
  async getEndereco(@Query('cep') cep: string): Promise<Endereco> {  
    return this.cepService.buscarEndereco(cep);
  }
}
