import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Animals } from "./animals.entities";

import { Comments } from "./userAnimalsComments.entities";

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
    onDelete: "CASCADE",
    eager: true,
  })
  animal: Animals[];

  @OneToMany((type) => Comments, (comment) => comment.user, {
    onDelete: "CASCADE",
  })
  comment: Comment[];
}
