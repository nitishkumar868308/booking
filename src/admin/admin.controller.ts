import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth() 
@ApiTags('Admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all registered users (admin only)' })
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('bookings')
  @ApiOperation({ summary: 'Get all bookings in the system (admin only)' })
  getAllBookings() {
    return this.adminService.getAllBookings();
  }
}
