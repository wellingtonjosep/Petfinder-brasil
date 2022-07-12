import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Animals } from "./animals.entities";

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

  @CreateDateColumn({ default: () => new Date() })
  created_at: Date;

  @CreateDateColumn({ default: () => new Date() })
  updated_at: Date;

  @OneToMany((type) => Animals, (animal) => animal.user, {
    eager: true,
  })
  animal: Animals[];

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}
