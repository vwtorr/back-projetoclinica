import { Controller, Get, Render } from '@nestjs/common';

@Controller('/reports')
export class ReportsController {
  @Get()
  getReportsPage() {
    return 'Página de Relatórios - Em breve!';
  }
}