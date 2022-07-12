import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { v4 as uuid } from "uuid";
import { Animals } from "./animals.entities";
import { User } from "./users.entities";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  comment: string;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => Animals)
  animals: Animals;
}
