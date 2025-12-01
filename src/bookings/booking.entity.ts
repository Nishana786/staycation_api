import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Property } from 'src/properties/property.entity';

@Entity({ name: 'booking' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'startdate', type: 'varchar' })
  startDate: string;

  @Column({ name: 'enddate', type: 'varchar' })
  endDate: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  //  FOREIGN KEY COLUMN: userid
  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userid' })
  user: User;

  // FOREIGN KEY COLUMN: propertyid
  @ManyToOne(() => Property, (property) => property.bookings)
  @JoinColumn({ name: 'propertyid' })
  property: Property;
}
