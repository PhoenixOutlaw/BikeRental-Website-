import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Reservation } from "./reservation.entity";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @JoinColumn()
  @OneToMany(()=>Reservation , (reservation)=>reservation.user)
  reservations: Reservation[];
}
