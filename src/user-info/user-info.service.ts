import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from './entities/user-info.entity';
import { User } from 'src/auth/entities/user.entity';

import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  private readonly logger = new Logger('UserInfoService');

  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(user: User, createUserInfoDto: CreateUserInfoDto) {
    try {
      const userInfo = this.userInfoRepository.create({
        ...createUserInfoDto,
        user,
      });
      await this.userInfoRepository.save(userInfo);
      return userInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findUserInfoByUser(user: User) {
    try {
      const findUserInfoByUser = await this.userInfoRepository.findOne({
        where: { user: user },
      });
      if (!findUserInfoByUser)
        throw new NotFoundException(`User with id: ${user.id} not found`);
      return findUserInfoByUser;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(user: User, updateUserInfoDto: UpdateUserInfoDto) {
    const findUserInfoByUser = await this.findUserInfoByUser(user);
    const userInfoToUpdate = await this.userInfoRepository.preload({
      id: findUserInfoByUser.id,
      ...updateUserInfoDto,
    });
    if (!userInfoToUpdate)
      throw new NotFoundException(`User with id: ${user.id} not found`);
    await this.userInfoRepository.save(userInfoToUpdate);
    return userInfoToUpdate;
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
