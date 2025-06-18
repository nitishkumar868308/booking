import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'User ID of the provider' })
  @IsUUID()
  userId: string;
}
