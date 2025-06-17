// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['CLIENT', 'PROVIDER'])
  role: 'CLIENT' | 'PROVIDER';
}
