import { Controller, Post, Body, Get, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}

  // 1) ADMIN → GET ALL BOOKINGS  (NO GUARD)
  @Get()
  getAll() {
    return this.service.findAll();
  }

  // 2) USER BOOKING CREATE → NEED JWT
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBookingDto, @Req() req: any) {
    return this.service.create(dto, req.user.id);
  }

  // 3) USER OWN BOOKINGS → NEED JWT
  @UseGuards(JwtAuthGuard)
  @Get('my')
  my(@Req() req: any) {
    return this.service.findByUser(req.user.id);
  }

  // 4) USER CANCEL BOOKING → NEED JWT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  cancelBooking(@Param('id') id: string, @Req() req: any) {
    return this.service.cancelBooking(+id, req.user.id);
  }
}
