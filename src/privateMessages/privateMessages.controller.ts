import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Put,
	Query,
	Req,
	UseGuards
} from '@nestjs/common';
import { PrivateMessagesService } from './privateMessages.service';
import { CreatePrivateMessageDto } from './dto/create-privateMessages.dto';
import { UpdatePrivateMessageDto } from './dto/update-privateMessages.dto';
import { PrivateMessage } from './entities/privateMessages.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/users/auth.guard';

@ApiTags('privateMessages')
@Controller('privateMessages')
export class PrivateMessagesController {
	constructor(
		private readonly privateMessagesService: PrivateMessagesService,
		private readonly jwtService: JwtService
	) {}

	@Post()
	async create(@Body() createPrivateMessageDto: CreatePrivateMessageDto) {
		return await this.privateMessagesService.create(createPrivateMessageDto);
	}

	@UseGuards(AuthGuard)
	@Get('/all')
	async findAll(
		@Query('receipt', ParseIntPipe) receipt: number,
		@Req() req: any
	): Promise<PrivateMessage[]> {
		return await this.privateMessagesService.findAll(receipt, req.user.id);
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

	@Post('messages')
	async messages(@Body('username') username: string, @Body('message') message: string) {
		await this.privateMessagesService.trigger('chat', 'message', {
			username,
			message
		});

		return [];
	}
}
