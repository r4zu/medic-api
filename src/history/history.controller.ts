import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { Auth } from 'src/auth/decorators';

import { HistoryService } from './history.service';

import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { PaginationDto } from 'src/common/dto/pagination.dtos';

import { ValidRoles } from 'src/auth/interfaces';

@Controller('history')
@Auth(ValidRoles.admin, ValidRoles.medic)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.historyService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }
}
