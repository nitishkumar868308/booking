import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'UUID of the client' })
  @IsUUID()
  clientId: string;

  @ApiProperty({ description: 'UUID of the provider' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ description: 'UUID of the selected availability slot' })
  @IsUUID()
  availabilityId: string;
}
