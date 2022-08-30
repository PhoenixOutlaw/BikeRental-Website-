import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation.entity";
import { Review } from "./review.entity";

@Entity()
export class Bike extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  location: string;

  @Column({ default: 0 })
  avgrating: number;
 
  @JoinColumn()
  @OneToMany(() => Review, (reviews) => reviews.bike)
  reviews: Review[];

  @JoinColumn()
  @OneToMany(()=>Reservation , (reservation)=>reservation.bike)
  reservations: Reservation[];
}
