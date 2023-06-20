import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.user;
    const chatId = +request.params.chatId;

    return this.validateOwnership(id, chatId);
  }

  private async validateOwnership(
    userId: number,
    id: number,
  ): Promise<boolean> {
    const chat = await this.chatRepository.findOneBy({ id });
    if (!chat) {
      throw new NotFoundException('Chat not found!');
    }
    if (userId !== chat.ownerId) {
      throw new ForbiddenException('You are not the owner of this chat');
    }

    return true;
  }
}
