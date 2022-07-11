import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";

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
  date: string;

  @Column()
  found: boolean;

  @ManyToOne((type) => User, (animal) => Animals, {
    eager: true,
  })
  user: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
