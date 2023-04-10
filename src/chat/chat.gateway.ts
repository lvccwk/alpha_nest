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
		this.server.emit('message', message);
	}

	// @SubscribeMessage({ value: 'pushMessage' })
	// AddMessage(sender, message: string) {
	// 	//推訊息給自己的前端畫面。
	// 	sender.emit('newMessage', message);
	// 	//推訊息給其他已建立連線的前端畫面。
	// 	sender.broadcast.emit('newMessage', message);
	// }

	// 	@SubscribeMessage('privateMessage')
	// 	handlePrivateMessage(
	// 		@MessageBody() message: string,
	// 		@ConnectedSocket() client: WebSocket
	// 	): void {
	// 		console.log(`Received private message: ${message}`);
	// 		const sender = 'sender_id'; // replace with actual sender ID
	// 		const receiver = 'receiver_id'; // replace with actual receiver ID
	// 		var roomid = url.parse(client.request.url, true).query.roomid; /*获取房间号 获取桌号*/
	// 		const room = `${sender}_${receiver}`;
	// 		client.join(sender);
	// 		this.server.to(5).emit('message', { message, sender, receiver });
	// 	}
}
