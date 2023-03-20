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
import { ChatroomsService } from './chatrooms.service';
import { CreateChatroomDto } from './dto/create-chatrooms.dto';
import { UpdateChatroomDto } from './dto/update-chatrooms.dto';
import { Chatroom } from './entities/chatrooms.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chatrooms')
@Controller('chatrooms')
export class ChatroomController {
  constructor(private readonly chatroomsService: ChatroomsService) {}

  @Post()
  async create(@Body() createCartDetailDto: CreateChatroomDto) {
    return await this.chatroomsService.create(createCartDetailDto);
  }

  @Get()
  async findAll(): Promise<Chatroom[]> {
    return await this.chatroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatroomDto: UpdateChatroomDto,
  ) {
    return this.chatroomsService.update(id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatroomsService.remove(id);
  }
}
