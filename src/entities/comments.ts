import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { Animals } from "./animals.entities";
import { User } from "./users.entities";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Animals, {
    onDelete: "CASCADE",
  })
  animals: Animals;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  userName: string;

  @Column()
  comment: string;

  @Column()
  created_at: Date;
}
