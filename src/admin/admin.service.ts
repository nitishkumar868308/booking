import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getAllUsers() {
        return this.prisma.user.findMany({
            where: {
                role: {
                    not: 'ADMIN',
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }


    async getAllBookings() {
        return this.prisma.booking.findMany({
            include: {
                client: {
                    select: { id: true, name: true, email: true },
                },
                provider: {
                    select: { id: true, name: true, email: true }, 
                },
                availability: true,
            },
        });
    }
}
