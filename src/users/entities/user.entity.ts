import { Exclude } from 'class-transformer';
import { ChatEntity } from 'src/chats/entities/chat.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  username: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'userAvatar', type: 'bytea', nullable: true })
  userAvatar: string;

  @ManyToMany(() => ChatEntity, (chat) => chat.users)
  @JoinTable({ name: 'user_chat' })
  chats: ChatEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
