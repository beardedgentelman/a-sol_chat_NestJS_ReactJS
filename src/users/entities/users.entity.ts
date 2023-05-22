import { FileEntity } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];
}
