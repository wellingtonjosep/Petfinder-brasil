import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid";
import { Animals } from "./animals.entities";

@Entity()
export class User {

  @PrimaryColumn("uuid")
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
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  @OneToMany(type => Animals, user => User)
  animal: Animals;
  

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}