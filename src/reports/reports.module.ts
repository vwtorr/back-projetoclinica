import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

@Injectable()
export class ReportsService {
  async generateSalesReport(startDate: string, endDate: string): Promise<Buffer> {
    const doc = new PDFDocument();
    const bufferChunks: Uint8Array[] = [];

    doc.on('data', (chunk) => bufferChunks.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Relatório de Vendas', { align: 'center' });
    doc.moveDown().fontSize(12).text(`Período: ${startDate} a ${endDate}`);
    doc.moveDown().text('Dados aqui...');

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(bufferChunks);
        resolve(pdfBuffer);
      });
    });
  }
}