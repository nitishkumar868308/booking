import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    // Check if availability is already booked
    const slot = await this.prisma.availability.findUnique({
      where: { id: dto.availabilityId },
    });

    if (!slot || slot.isBooked) {
      throw new BadRequestException('Slot already booked or invalid');
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        clientId: dto.clientId,
        providerId: dto.providerId,
        availabilityId: dto.availabilityId,
      },
    });

    // Mark slot as booked
    await this.prisma.availability.update({
      where: { id: dto.availabilityId },
      data: { isBooked: true },
    });

    return booking;
  }

  async getAllForClient(clientId: string) {
    return this.prisma.booking.findMany({
      where: { clientId },
      include: { provider: true, availability: true },
    });
  }
}
