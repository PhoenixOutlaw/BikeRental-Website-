import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bike } from "./bike.entity";
import { User } from "./user.entity";

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @Column({default:true})
  active: boolean;


  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Bike, (bike) => bike.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  bike: Bike;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
