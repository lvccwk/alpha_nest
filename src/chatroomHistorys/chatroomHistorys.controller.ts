import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatroomHistorysService } from './chatroomHistorys.service';
import { CreateChatroomHistoryDto } from './dto/create-chatroomHistorys.dto';
import { UpdateChatroomHistoryDto } from './dto/update-chatroomHistorys.dto';
import { ChatroomHistory } from './entities/chatroomHistorys.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chatroomHistorys')
@Controller('chatroomHistorys')
export class ChatroomHistorysController {
  constructor(
    private readonly chatroomHistorysService: ChatroomHistorysService,
  ) {}

  @Post()
  async create(@Body() createChatroomHistoryDto: CreateChatroomHistoryDto) {
    return await this.chatroomHistorysService.create(createChatroomHistoryDto);
  }

  @Get()
  async findAll(): Promise<ChatroomHistory[]> {
    return await this.chatroomHistorysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomHistorysService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatroomHistoryDto: UpdateChatroomHistoryDto,
  ) {
    return this.chatroomHistorysService.update(id, updateChatroomHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatroomHistorysService.remove(id);
  }
}
