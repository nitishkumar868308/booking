import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateAvailabilityDto) {
        return this.prisma.availability.create({
            data: {
                providerId: dto.providerId,
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

    // availability.service.ts
    async getAvailableSlots() {
        return this.prisma.availability.findMany({
            where: {
                isBooked: false,
            },
            include: {
                provider: {
                    include: {
                        user: true, // get name, email of provider
                    },
                },
            },
        });
    }

}
