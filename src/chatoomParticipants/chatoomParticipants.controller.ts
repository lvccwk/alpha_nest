import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Put
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ChatroomParticipantsService } from './chatoomParticipants.service';
import { CreateChatroomParticipantDto } from './dto/create-chatoomParticipants.dto';
import { UpdateChatroomParticipantDto } from './dto/update-chatoomParticipants.dto';
import { ChatroomParticipant } from './entities/chatoomParticipants.entity';

@ApiTags('chatroomParticipants')
@Controller('chatroomParticipants')
export class ChatroomParticipantsController {
	constructor(private readonly chatroomParticipantsService: ChatroomParticipantsService) {}

	@Post()
	async create(@Body() createChatroomParticipantDto: CreateChatroomParticipantDto) {
		return await this.chatroomParticipantsService.create(createChatroomParticipantDto);
	}

	@Get()
	async findAll(): Promise<ChatroomParticipant[]> {
		return await this.chatroomParticipantsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.chatroomParticipantsService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateChatroomParticipantDto: UpdateChatroomParticipantDto
	) {
		return this.chatroomParticipantsService.update(id, updateChatroomParticipantDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.chatroomParticipantsService.remove(id);
	}
}
