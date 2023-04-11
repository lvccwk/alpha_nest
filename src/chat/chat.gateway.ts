import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	MessageBody,
	ConnectedSocket
} from '@nestjs/websockets';
import { WebSocket } from 'ws';
import * as url from 'url';

@WebSocketGateway(3001, { cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server;

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string, @ConnectedSocket() client: WebSocket): void {
		console.log(message);
		this.server.to('message', message);
	}

	@SubscribeMessage('joinRoom')
	joinRoom(@MessageBody() message: string, @ConnectedSocket() client: WebSocket): void {
		const sender = Number(message[0]); // replace with actual sender ID
		const receiver = Number(message[1]); // replace with actual receiver ID
		// var roomid = url.parse(client.request.url, true).query.roomid; /*获取房间号 获取桌号*/
		const room1 = `${sender}_${receiver}`;
		const room2 = `${receiver}_${sender}`;

		console.log({
			room1,
			room2
		});
		client.join(room1);
		client.join(room2);
		// this.server.emit('message', message);
	}
	@SubscribeMessage('privateMessage')
	handlePrivateMessage(
		@MessageBody() message: string,
		@ConnectedSocket() client: WebSocket
	): void {
		client.server.to('5_1').emit('message', 'test');
		console.log('message: ', message);
		// console.log(`Received private message: ${message}`);
		// console.log(`private message: ${message[0]}`);
		// console.log(`sender_id: ${message[1]}`);
		// console.log(`receiver_id: ${message[2]}`);
		// const sender = Number(message[1]); // replace with actual sender ID
		// const receiver = Number(message[2]); // replace with actual receiver ID
		// const room = `${sender}_${receiver}`;
		// console.log(`room`, room);
		// client.join(room);
		// this.server.to(room).emit('privateMessage', { message, sender, receiver });
	}
}
