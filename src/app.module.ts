import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { AvailabilityModule } from './availability/availability.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ AuthModule, BookingModule, AvailabilityModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}