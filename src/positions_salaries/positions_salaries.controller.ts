import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PositionsSalariesService } from './positions_salaries.service';
import { CreatePositionsSalaryDto } from './dto/create-positions_salary.dto';
import { UpdatePositionsSalaryDto } from './dto/update-positions_salary.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiBearerAuth()
@Controller('positions-salaries')
export class PositionsSalariesController {
  constructor(
    private readonly positionsSalariesService: PositionsSalariesService,
  ) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createPositionsSalaryDto: CreatePositionsSalaryDto) {
    return this.positionsSalariesService.create(createPositionsSalaryDto);
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.positionsSalariesService.findAll();
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.positionsSalariesService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updatePositionsSalaryDto: UpdatePositionsSalaryDto,
  ) {
    return this.positionsSalariesService.update(+id, updatePositionsSalaryDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.positionsSalariesService.remove(+id);
  }
}
