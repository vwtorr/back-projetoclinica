import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Between, ILike, Not, Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSES_REPOSITORY')
    private expensesRepository: Repository<Expense>,
  ) {}

  private validateType(type: string) {
    const validTypes = ['Conta a Pagar', 'Conta a Receber'];
    if (!validTypes.includes(type)) {
      throw new HttpException(
        `Tipo inválido. Os tipos válidos são: ${validTypes.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      this.validateType(createExpenseDto.type);

      // Verifica se já existe documento com mesmo tipo
      const existing = await this.expensesRepository.findOne({
        where: {
          document: createExpenseDto.document,
          type: createExpenseDto.type,
        },
      });
      if (existing) {
        throw new HttpException(
          `Documento já cadastrado para o tipo "${createExpenseDto.type}"`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const newRegister = this.expensesRepository.create(createExpenseDto);
      return await this.expensesRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    search: string,
    initialDate: string,
    finalDate: string,
  ): Promise<Expense[]> {
    try {
      let where = [];

      if (search) {
        where = [
          { document: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
          { releaseDate: ILike(`%${search}%`) },
          { value: ILike(`%${search}%`) },
          { type: ILike(`%${search}%`) },
          { status: ILike(`%${search}%`) },
          { paymentStatus: ILike(`%${search}%`) },
        ];
      }
      if (initialDate && finalDate) {
        where.push({ releaseDate: Between(initialDate, finalDate) });
      }
      return await this.expensesRepository.find({ where });
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Expense> {
    try {
      return await this.expensesRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    try {
      const expenses = await this.findOne(id);
      if (!expenses) {
        throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
      }


      if (updateExpenseDto.type) {
        this.validateType(updateExpenseDto.type);
      }


      const newDocument = updateExpenseDto.document ?? expenses.document;
      const newType = updateExpenseDto.type ?? expenses.type;

      if (
        newDocument !== expenses.document ||
        newType !== expenses.type
      ) {
        const existing = await this.expensesRepository.findOne({
          where: {
            document: newDocument,
            type: newType,
            id: Not(id), 
          },
        });
        if (existing) {
          throw new HttpException(
            `Documento já cadastrado para o tipo "${newType}"`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Atualiza os campos se fornecidos
      if (updateExpenseDto.description !== undefined) {
        expenses.description = updateExpenseDto.description;
      }
      if (updateExpenseDto.document !== undefined) {
        expenses.document = updateExpenseDto.document;
      }
      if (updateExpenseDto.releaseDate !== undefined) {
        expenses.releaseDate = updateExpenseDto.releaseDate;
      }
      if (updateExpenseDto.status !== undefined) {
        expenses.status = updateExpenseDto.status;
      }
      if (updateExpenseDto.type !== undefined) {
        expenses.type = updateExpenseDto.type;
      }
      if (updateExpenseDto.value !== undefined) {
        expenses.value = updateExpenseDto.value;
      }

      expenses.updatedAt = new Date();
      return await this.expensesRepository.save(expenses);
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Expense> {
    try {
      const expenses = await this.findOne(id);
      if (!expenses) {
        throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
      }
      return await this.expensesRepository.softRemove(expenses);
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
