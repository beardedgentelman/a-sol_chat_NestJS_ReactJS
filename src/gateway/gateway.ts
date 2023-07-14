import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';
import { MessageService } from 'src/messages/message.service';

@WebSocketGateway(8082, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // console.log('Connected with id: ', socket.id);

      socket.on('joinRoom', async (room: string) => {
        socket.join(room);

        socket.broadcast.to(room).emit('reloadPage');
      });

      socket.on('getMessages', async (messComparison) => {
        const { chatId, filteredMessages } = messComparison;

        const result = await this.messageService.msgIndexDBComparison(
          +chatId,
          filteredMessages,
        );

        socket.emit('getMessagesResult', result);
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
    if (message.text !== '') {
      this.messageService.createMessage(message);
    }
  }
}
