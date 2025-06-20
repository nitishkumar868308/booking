
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashedPassword,
                role: dto.role,
            },
        });

        const token = this.jwtService.sign({ userId: user.id, role: user.role });
        return { token };
    }


    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log('User Role:', user.role);

        const token = this.jwtService.sign({ userId: user.id, role: user.role });
        return { token };
    }
}
