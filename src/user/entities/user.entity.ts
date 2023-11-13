import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "../../photo/entities/photo.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column({select: false})
    password: string;

    @Column()
    email: string;

    @Column()
    role: string;
  
    @Column({ default: true })
    active: boolean;
  
    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
