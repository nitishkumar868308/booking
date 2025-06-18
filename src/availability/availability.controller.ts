import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @Get(':providerId')
  getByProvider(@Param('providerId') providerId: string) {
    return this.availabilityService.getByProvider(providerId);
  }

  @Get()
  getAvailableSlots() {
    return this.availabilityService.getAvailableSlots();
  }
}
