import { Controller, Request, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/role-auth.guard';
import { Roles } from 'src/core/guards/roles.decorator';
import { ApiPaginatedResponse } from 'src/core/repositories/api-pagination.response';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { UserListDto } from '../dtos/user-list.dto';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Get profile',
    description: 'Get profile',
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

  @Get()
  @ApiPaginatedResponse({
    model: UserEntity,
    description: 'List of User',
  })
  async getPaginateUser(
    @Query() query: UserListDto,
  ): Promise<Pagination<UserEntity>> {
    return this.userService.paginate(query);
  }
}
