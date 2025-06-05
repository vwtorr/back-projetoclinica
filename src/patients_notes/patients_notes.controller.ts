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
import { PatientsNotesService } from './patients_notes.service';
import { CreatePatientsNoteDto } from './dto/create-patients_note.dto';
import { UpdatePatientsNoteDto } from './dto/update-patients_note.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiBearerAuth()
@Controller('patients-notes')
export class PatientsNotesController {
  constructor(private readonly patientsNotesService: PatientsNotesService) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createPatientsNoteDto: CreatePatientsNoteDto) {
    return this.patientsNotesService.create(createPatientsNoteDto);
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.patientsNotesService.findAll();
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.patientsNotesService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updatePatientsNoteDto: UpdatePatientsNoteDto,
  ) {
    return this.patientsNotesService.update(+id, updatePatientsNoteDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.patientsNotesService.remove(+id);
  }
}
