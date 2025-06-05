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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiBearerAuth()
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createServiceDto: CreateServiceDto) {
    const createdService = await this.servicesService.create(createServiceDto);
    return { id: createdService.id };  // Retorna o id do serviço criado
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query('search') search: string) {
    return this.servicesService.findAll(search);
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
// @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
