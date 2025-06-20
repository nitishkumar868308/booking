import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthRequest } from '../common/types/auth-request';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER')
  @ApiBearerAuth()
  create(@Body() dto: CreateAvailabilityDto, @Req() req: AuthRequest) {
    const user = req.user as any;
    console.log("user" , user)
    return this.availabilityService.create(dto, user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER')
  @ApiBearerAuth()
  @Get('providerAvailability')
  getByProvider(@Req() req: AuthRequest) {
    const providerId = req.user.id; 
    return this.availabilityService.getByProvider(providerId);
  }

  @Get()
  getAvailableSlots() {
    return this.availabilityService.getAvailableSlots();
  }
}
