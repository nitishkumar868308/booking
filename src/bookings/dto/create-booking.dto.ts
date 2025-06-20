import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {

  @ApiProperty({ description: 'UUID of the selected availability slot' })
  @IsUUID()
  availabilityId: string;
}
