import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Animals } from "./animals.entities";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  comment: string;

  // @ManyToMany((type) => User, {
  //   eager: true,
  // })
  // @JoinTable()
  // user: User;

  // @ManyToOne((type) => Animals)
  // @JoinTable()
  // animals: Animals;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
