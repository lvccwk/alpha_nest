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
import { ChatoomParticipantsService } from './chatoomParticipants.service';
import { CreateChatoomParticipantDto } from './dto/create-chatoomParticipants.dto';
import { UpdateChatoomParticipantDto } from './dto/update-chatoomParticipants.dto';
import { ChatoomParticipant } from './entities/chatoomParticipants.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chatoomParticipants')
@Controller('chatoomParticipants')
export class ChatoomParticipantsController {
  constructor(
    private readonly chatoomParticipantsService: ChatoomParticipantsService,
  ) {}

  @Post()
  async create(
    @Body() createChatoomParticipantDto: CreateChatoomParticipantDto,
  ) {
    return await this.chatoomParticipantsService.create(
      createChatoomParticipantDto,
    );
  }

  @Get()
  async findAll(): Promise<ChatoomParticipant[]> {
    return await this.chatoomParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatoomParticipantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatoomParticipantDto: UpdateChatoomParticipantDto,
  ) {
    return this.chatoomParticipantsService.update(
      id,
      updateChatoomParticipantDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatoomParticipantsService.remove(id);
  }
}
