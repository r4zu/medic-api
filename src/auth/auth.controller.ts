import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Get,
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RoleDto, UserDto } from './dto';
import { Auth } from './decorators';
import { ValidRoles } from './interfaces';
import { PaginationDto } from 'src/common/dto/pagination.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: UserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: UserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('all')
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Patch('change-role')
  @Auth(ValidRoles.admin)
  changeRole(@Body() data: RoleDto) {
    return this.authService.changeRole(data);
  }

  @Patch('soft-delete')
  @Auth(ValidRoles.admin)
  softDeleteUserByEmail(@Body('email') email: string) {
    return this.authService.softDelete(email);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.remove(id);
  }

  // ? Example
  // ? Just @Auth alone is for authentication
  // ? Give @Auth through ValidRoles is for roles autorization
  // ? Also we've @GetUser to get info of the current user
  // @Get('private')
  // @Auth(ValidRoles.user)
  // privateRoute(@GetUser() user: string) {
  //   return {
  //     ok: true,
  //     user,
  //   };
  // }
}
