import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/users/services/auth.service';
import { UserLoginDto } from '../dtos/user-login.dto';

@ApiTags('Admin auths')
@Controller('api/admin-auths')
export class AdminAuthController {
  constructor(
    private authService: AuthService, // private jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register User',
    description: 'Register User',
  })
  async register(@Body() body: CreateUserDto) {
    return this.authService.registerAdminAccount(body);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }
}
