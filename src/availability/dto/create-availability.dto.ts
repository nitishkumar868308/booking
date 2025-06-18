import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAvailabilityDto {
  @ApiProperty({ description: 'Provider UUID' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ description: 'Availability start time in ISO format', example: '2025-06-19T10:00:00.000Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'Availability end time in ISO format', example: '2025-06-19T11:00:00.000Z' })
  @IsDateString()
  endTime: string;
}
