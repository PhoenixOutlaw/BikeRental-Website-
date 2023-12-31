import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bike } from "./bike.entity";
import { User } from "./user.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  from: string;

  @Column()
  rating: number;

  @Column()
  review: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Bike, (bike) => bike.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  bike: Bike;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
