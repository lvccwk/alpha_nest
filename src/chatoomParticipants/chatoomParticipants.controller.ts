import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChatroomParticipantsService } from './chatroomParticipants.service';
import { CreateChatroomParticipantDto } from './dto/create-chatroomParticipants.dto';
import { UpdateChatroomParticipantDto } from './dto/update-chatroomParticipants.dto';
import { ChatroomParticipant } from './entities/chatroomParticipants.entity';
import { ApiTags } from '@nestjs/swagger';

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

	@Patch(':id')
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
