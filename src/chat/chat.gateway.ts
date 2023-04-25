import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	MessageBody,
	ConnectedSocket
} from '@nestjs/websockets';
import { WebSocket } from 'ws';
import * as url from 'url';

@WebSocketGateway({ cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server;

	@SubscribeMessage('joinRoom')
	joinRoom(@MessageBody() message: string, @ConnectedSocket() client: WebSocket): void {
		const sender = Number(message[0]);
		const receiver = Number(message[1]);
		const room1 = `${sender}_${receiver}`;
		const room2 = `${receiver}_${sender}`;

		client.join(room1);
		client.join(room2);
	}
	@SubscribeMessage('privateMessage')
	handlePrivateMessage(
		@MessageBody() message: string,
		@ConnectedSocket() client: WebSocket
	): void {
		const sender = Number(message[1]);
		const receiver = Number(message[2]);
		const room1 = `${sender}_${receiver}`;
		const room2 = `${receiver}_${sender}`;
		client.server.to(room1).emit('message', message);

		console.log(`sender : ${message[1]} :  ${message[0]} `);
		console.log(`receiver : ${message[2]} :  ${message[0]} `);
	}
}
