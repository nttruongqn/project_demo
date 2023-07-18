import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/users/services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Auth')
@Controller('auths')
export class AuthController {
  constructor(
    private authService: AuthService, // private jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register User',
    description: 'Register User',
  })
  async register(@Body() body: CreateUserDto) {
    return this.authService.registerUserAccount(body);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.handleRefreshToken(body.refreshToken);
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
    };
  }
}
