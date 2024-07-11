import { IsEmail, IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  role: string;
}
