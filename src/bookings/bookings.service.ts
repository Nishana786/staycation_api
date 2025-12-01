import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Property } from '../properties/property.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,

    @InjectRepository(Property)
    private propertiesRepo: Repository<Property>,

    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  //  GET ALL BOOKINGS (ADMIN)
  async findAll() {
    return this.repo.find({
      relations: ['user', 'property'],
      order: { id: 'DESC' },
    });
  }

  //  CREATE BOOKING (USER)
  async create(dto: CreateBookingDto, userId: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const property = await this.propertiesRepo.findOne({ where: { id: dto.propertyId } });
    if (!property) throw new NotFoundException('Property not found');

    const booking = this.repo.create({
      startDate: dto.startDate,
      endDate: dto.endDate,
      user: { id: userId },
      property: { id: dto.propertyId },
    });

    return this.repo.save(booking);
  }

  //  GET USER OWN BOOKINGS
  findByUser(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['property'],
      order: { createdAt: 'DESC' },
    });
  }

  // ⭐CANCEL BOOKING
  async cancelBooking(id: number, userId: number) {
    const booking = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.user.id !== userId) {
      throw new ForbiddenException('You cannot cancel this booking');
    }

    await this.repo.remove(booking);

    return { message: 'Booking cancelled successfully' };
  }
}
