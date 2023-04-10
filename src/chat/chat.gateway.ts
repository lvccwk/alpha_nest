import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	MessageBody
} from '@nestjs/websockets';

@WebSocketGateway(3001, { cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server;

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		console.log(message);
		this.server.emit('message', message);
	}
}
