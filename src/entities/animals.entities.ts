import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { Comment } from "./userAnimalsComments.entities";
import { User } from "./users.entities";

@Entity()
export class Animals {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  species: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  lastLocation: string;

  @Column()
  lastDate: string;

  @Column()
  found: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.animal)
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.user, {
    eager: true,
  })
  comment: Comment[];
}
