import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/role-auth.guard';
import { Roles } from 'src/core/guards/roles.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  async getProfile(@Request() req): Promise<UserEntity> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-guard')
  @ApiOperation({
    summary: 'guard',
    description: 'guard',
  })
  async guardAdmin(): Promise<any> {
    return 'guard';
  }
}
