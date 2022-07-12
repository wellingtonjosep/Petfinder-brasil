import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./users.entities";

@Entity()
export class Animals {
  @PrimaryColumn("uuid")
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

  // @ManyToOne((type) => Comment, {
  //   eager: true,
  // })
  // comment: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
