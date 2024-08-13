import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';

import { MedicInfo } from './entities/medic-info.entity';
import { User } from 'src/auth/entities/user.entity';

import { MedicInfoService } from './medic-info.service';

import { CreateMedicInfoDto } from './dto/create-medic-info.dto';
import { UpdateMedicInfoDto } from './dto/update-medic-info.dto';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('medic-info')
@Auth()
export class MedicInfoController {
  constructor(private readonly medicInfoService: MedicInfoService) {}

  @Post()
  @Auth(ValidRoles.medic)
  create(
    @GetUser() user: User,
    @Body() createMedicInfoDto: CreateMedicInfoDto,
  ): Promise<MedicInfo> {
    return this.medicInfoService.create(user, createMedicInfoDto);
  }

  @Get()
  findMedicInfoByUser(@GetUser() user: User): Promise<MedicInfo> {
    return this.medicInfoService.findMedicInfoByUser(user);
  }

  @Patch()
  @Auth(ValidRoles.medic)
  update(
    @GetUser() user: User,
    @Body() updateMedicInfoDto: UpdateMedicInfoDto,
  ): Promise<MedicInfo> {
    return this.medicInfoService.update(user, updateMedicInfoDto);
  }
}
