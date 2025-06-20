import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateAvailabilityDto, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.role !== 'PROVIDER') {
            throw new ForbiddenException('You are not authorized to create availability');
        }

        return this.prisma.availability.create({
            data: {
                providerId: user.id,
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
            },
        });
    }
    async getByProvider(providerId: string) {
        return this.prisma.availability.findMany({
            where: { providerId },
        });
    }

    async getAvailableSlots() {
        return this.prisma.availability.findMany({
            where: { isBooked: false },
            include: {
                provider: {
                    select: { id: true, name: true, email: true }, 
                },
            },
        });
    }
}
