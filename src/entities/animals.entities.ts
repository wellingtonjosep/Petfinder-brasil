import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Comments } from "./comments";
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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.animal, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToMany(() => Comments)
  @JoinTable()
  comments: Comments[];
}
