import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { RoleDto, UserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ValidRoles } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: UserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: UserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user)
      throw new UnauthorizedException(`Credentials are not valid (email)`);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid (password)`);
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  async changeRole(data: RoleDto) {
    const { email, role } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(`User with email: ${email} not found`);
    if (role !== ValidRoles.medic && role !== ValidRoles.assistant) {
      throw new NotFoundException(
        `Rol with: ${role} doesn't exist, check other rol.`,
      );
    }
    const userUpdated = await this.userRepository.preload({
      id: user.id,
      roles: [role],
    });
    await this.userRepository.save(userUpdated);
    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    await this.userRepository.remove(user);
    return { message: `User ${user.email} was deleted.` };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
