import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get('client/:clientId')
  getClientBookings(@Param('clientId') clientId: string) {
    return this.bookingService.getAllForClient(clientId);
  }
}
