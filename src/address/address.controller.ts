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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
//  @Roles(Role.User, Role.Employee, Role.Admin)
//  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
