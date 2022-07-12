import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Animals } from "./animals.entities";
import { User } from "./users.entities";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  comment: string;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => Animals)
  animals: Animals;

  @CreateDateColumn()
  created_at: Date;
}
