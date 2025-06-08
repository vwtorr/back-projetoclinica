import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Remova o método getHello() duplicado e com erro.
  // Mantenha apenas este, que já está correto.
  getInfo(): { status: string; date: Date } {
    return {
      status: 'API está funcionando perfeitamente!',
      date: new Date(), // Retorna a data e hora atual
    };
  }
}