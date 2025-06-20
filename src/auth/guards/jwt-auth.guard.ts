
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('JwtAuthGuard => user:', user);
    console.log('JwtAuthGuard => err:', err);
    console.log('JwtAuthGuard => info:', info);
    return user; 
  }
}
