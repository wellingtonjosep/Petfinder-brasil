import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Animals } from "./animals.entities";
import { User } from "./users.entities";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Animals)
  animal!: Animals;

  @Column()
  userName: string;

  @Column()
  comment: string;

  @Column()
  created_at: Date;
}
