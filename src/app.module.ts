import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { AvailabilityModule } from './availability/availability.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [ConfigModule, AuthModule, BookingModule, AvailabilityModule, ProviderModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Module } from '@nestjs/common';



// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       url: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false, // needed for Neon
//       },
//       autoLoadEntities: true,
//       synchronize: true, // turn false in production
//     }),
//   ],
// })
// export class AppModule {}
