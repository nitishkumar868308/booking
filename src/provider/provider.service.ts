import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProviderDto) {
    // Check if user already exists as provider
    const existing = await this.prisma.provider.findUnique({
      where: { userId: dto.userId },
    });

    if (existing) {
      throw new ConflictException('Provider already exists for this user');
    }

    return this.prisma.provider.create({
      data: {
        userId: dto.userId,
      },
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.provider.findMany({ include: { user: true } });
  }
}
