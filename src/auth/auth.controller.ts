import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

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
