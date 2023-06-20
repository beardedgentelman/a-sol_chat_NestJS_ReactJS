import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ChatDto } from './dto/chat.dto';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createChat(id: number, chatDto: ChatDto) {
    const user = await this.userRepository.findOneBy({ id });
    const userToChat = {
      id: user.id,
      username: user.name,
      email: user.email,
      userAvatar: user.avatar,
    };
    const newChat = this.chatRepository.create({
      ...chatDto,
      ownerId: id,
      users: [userToChat],
    });

    return this.chatRepository.save(newChat);
  }

  async joinChat(id: number, chatId: number) {
    const user = await this.userRepository.findOneBy({ id });
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (!chat) {
      throw new NotFoundException('Chat not found!');
    }
    console.log(chat.users);
    const isUserInChat = chat.users.some((cUser) => cUser.id === user.id);
    if (isUserInChat) {
      throw new ConflictException('You are already in this chat');
    }
    chat.users.push(user);

    return this.chatRepository.save(chat);
  }

  async leaveChat(id: number, chatId: number) {
    const user = await this.userRepository.findOneBy({ id });
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });
    const isUserInChat = chat.users.some((cUser) => cUser.id === user.id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (!chat) {
      throw new NotFoundException('Chat not found!');
    }
    if (!isUserInChat) {
      throw new NotFoundException('You are not in this chat.');
    }
    chat.users = chat.users.filter((cUser) => cUser.id !== user.id);
    return await this.chatRepository.save(chat);
  }

  async deleteUserFromChat(chatId: number, userId: number) {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });
    if (!chat) {
      throw new NotFoundException('Chat not found!');
    }

    const userIndex = chat.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found in this chat!');
    }

    chat.users.splice(userIndex, 1);
    return this.chatRepository.save(chat);
  }

  async deleteChat(chatId: number) {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });
    if (!chat) {
      throw new NotFoundException('Chat not found!');
    }
    return this.chatRepository.delete(chatId);
  }
}
