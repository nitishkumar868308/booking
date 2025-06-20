import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) { }

  async create(clientId: string, availabilityId: string) {
    const slot = await this.prisma.availability.findUnique({
      where: { id: availabilityId },
    });

    if (!slot || slot.isBooked) {
      throw new BadRequestException('Slot already booked or invalid');
    }

    const booking = await this.prisma.booking.create({
      data: {
        clientId,
        providerId: slot.providerId,
        availabilityId,
      },
    });

    await this.prisma.availability.update({
      where: { id: availabilityId },
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
