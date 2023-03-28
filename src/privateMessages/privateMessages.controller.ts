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
import { PrivateMessagesService } from './privateMessages.service';
import { CreatePrivateMessageDto } from './dto/create-privateMessages.dto';
import { UpdatePrivateMessageDto } from './dto/update-privateMessages.dto';
import { PrivateMessage } from './entities/privateMessages.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('privateMessages')
@Controller('privateMessages')
export class PrivateMessagesController {
	constructor(private readonly privateMessagesService: PrivateMessagesService) {}

	@Post()
	async create(@Body() createPrivateMessageDto: CreatePrivateMessageDto) {
		return await this.privateMessagesService.create(createPrivateMessageDto);
	}

	@Get()
	async findAll(): Promise<PrivateMessage[]> {
		return await this.privateMessagesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.privateMessagesService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePrivateMessageDto: UpdatePrivateMessageDto
	) {
		return this.privateMessagesService.update(id, updatePrivateMessageDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.privateMessagesService.remove(id);
	}
}
