import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Animals } from "./animals.entities";
import { Comments } from "./comments";
import { v4 as uuid } from "uuid";

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany((type) => Animals, (animal) => animal.user, {
    onDelete: "CASCADE",
    eager: true,
  })
  animal: Animals[];
}
