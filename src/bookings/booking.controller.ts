import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequest } from '../common/types/auth-request';
import { Req } from '@nestjs/common';


@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('CLIENT')
  create(@Req() req: AuthRequest, @Body() dto: CreateBookingDto) {
    const clientId = req.user['id'];
    return this.bookingService.create(clientId, dto.availabilityId);
  }

  @ApiBearerAuth()
  @Get('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  getClientBookings(@Req() req: AuthRequest) {
    const clientId = req.user.id;
    return this.bookingService.getAllForClient(clientId);
  }
}
