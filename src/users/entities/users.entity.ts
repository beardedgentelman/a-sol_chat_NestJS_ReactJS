import { FileEntity } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];
}
