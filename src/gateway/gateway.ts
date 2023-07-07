import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';

@WebSocketGateway(8082, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(private readonly chatsService: ChatsService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // console.log('Connected with id: ', socket.id);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
        // console.log(`Socket ${socket.id} joined room ${room}`);
        socket.broadcast.to(room).emit('reloadPage');
      });

      socket.on('chatsSearch', async (value: string) => {
        const result = await this.chatsService.searchChat(value);

        socket.emit('chatsSearchResult', result);
      });
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    const { room, message } = body;
    this.server.to(room).emit('onMessage', message);
  }
}
