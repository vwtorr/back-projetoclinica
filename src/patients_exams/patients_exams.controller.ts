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
import { PatientsExamsService } from './patients_exams.service';
import { CreatePatientsExamDto } from './dto/create-patients_exam.dto';
import { UpdatePatientsExamDto } from './dto/update-patients_exam.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiBearerAuth()
@Controller('patients-exams')
export class PatientsExamsController {
  constructor(private readonly patientsExamsService: PatientsExamsService) {}

  @Post()
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createPatientsExamDto: CreatePatientsExamDto) {
    return this.patientsExamsService.create(createPatientsExamDto);
  }

  @Get('group-by-user-id/:id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  patientsGroupById(@Param('id') id: string) {
    return this.patientsExamsService.patientsGroupById(+id);
  }

  @Get('group-by-user-id/:id/:date')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  patientsGroupByIdAndDate(@Param('id') id: string, @Param('date') date: string)  {
    return this.patientsExamsService.patientsGroupByIdAndDate(+id,date);
  }

  @Get()
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  findAll(
    @Query('search') search: string,
    @Query('initialDate') initialDate: string,
    @Query('finalDate') finalDate: string,
  ) {
    return this.patientsExamsService.findAll(search, initialDate, finalDate);
  }

  @Get(':id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.patientsExamsService.findOne(+id);
  }

  @Patch(':id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updatePatientsExamDto: UpdatePatientsExamDto,
  ) {
    return this.patientsExamsService.update(+id, updatePatientsExamDto);
  }

  @Delete(':id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.patientsExamsService.remove(+id);
  }
}
