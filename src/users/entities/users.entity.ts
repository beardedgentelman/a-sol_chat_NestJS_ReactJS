import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'userAvatar', type: 'bytea', nullable: true })
  userAvatar: string;
}
