import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RoleDto, UserDto } from './dto';
import { Auth } from './decorators';
import { ValidRoles } from './interfaces';

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

  @Patch('change-role')
  @Auth(ValidRoles.admin)
  changeRole(@Body() data: RoleDto) {
    return this.authService.changeRole(data);
  }

  // TODO: This controller
  // @Patch('change-active')
  // @Auth(ValidRoles.admin)
  // changeActive(@Body() isActive: boolean) {
  //   return;
  // }

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
