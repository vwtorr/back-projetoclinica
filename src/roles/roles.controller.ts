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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
