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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  //  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':type')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  //  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Param('type') type: string, @Query('search') search: string) {
    return this.usersService.findAll(type, search);
  }

  @Get('users/:id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  //  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  //  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  //  @Roles(Role.User, Role.Employee, Role.Admin)
  //  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
