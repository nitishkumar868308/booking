import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { PrismaService } from '../config/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, PrismaService],
})
export class AvailabilityModule {}
