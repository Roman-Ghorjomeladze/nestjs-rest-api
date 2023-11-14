import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column()
  etag: string;

  @Column()
  clientId?: number;

  @ManyToOne(() => Client, (client) => client.photos)
  client: Client;
}
