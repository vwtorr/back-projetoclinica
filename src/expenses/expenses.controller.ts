import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  findAll(
    @Query('search') search: string,
    @Query('initialDate') initialDate: string,
    @Query('finalDate') finalDate: string,
  ) {
    return this.expensesService.findAll(search, initialDate, finalDate);
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}

