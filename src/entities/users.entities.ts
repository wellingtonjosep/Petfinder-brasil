import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Animals } from "./animals.entities";

import { Comment } from "./userAnimalsComments.entities";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Animals, (animal) => animal.user, {
    eager: true,
  })
  animal: Animals[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comment: Comment[];
}
