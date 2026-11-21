import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req: any) {
    // The user object here is populated by the JwtStrategy
    return req.user;
  }

  @Get()
  getAllInMyOrganization(@Request() req: any) {
    return this.usersService.findAllInOrganization(req.user.organizationId);
  }
}
