import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiBody({
    type: RegisterDto,
    examples: {
      example1: {
        summary: 'Register a User',
        value: {
          email: 'email',
          password: 'password',
          name: 'name',
          role: 'CLIENT OR PROVIDER',
        },
      },
    },
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Login with email and password',
        value: {
          email: 'email',
          password: 'password',
        },
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
