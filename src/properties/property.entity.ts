import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  bedrooms: number;

  @Column()
  image: string;

  @OneToMany(() => Booking, (b) => b.property)
  bookings: Booking[];
}
