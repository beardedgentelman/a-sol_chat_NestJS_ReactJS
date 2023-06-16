import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8081, { cors: '3000' })
export class ChatGetaway {
  @WebSocketServer()
  server;

  @SubscribeMessage('messages')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('messages', message);
  }
}
