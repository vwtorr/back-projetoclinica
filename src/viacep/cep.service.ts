import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface EnderecoResponse {
  erro?: boolean;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  async buscarEndereco(cep: string): Promise<Endereco> {
    cep = cep.replace(/\D/g, ''); // remove caracteres não numéricos

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const { data } = await firstValueFrom(this.httpService.get<EnderecoResponse>(url));

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return data as Endereco; // Tipando explicitamente como Endereco
  }
}
