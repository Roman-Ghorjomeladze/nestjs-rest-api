import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Photo } from '../../photo/entities/photo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  userId: number;

  @Column()
  avatarId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.client)
  user: User;

  @ManyToOne(() => Photo, (avatar) => avatar.client)
  avatar: Photo;

  @OneToMany(() => Photo, (photo) => photo.client)
  photos: Photo[];
}
