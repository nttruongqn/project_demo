import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/users/services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@ApiTags('User Auth')
@Controller('api/auths')
export class AuthController {
  constructor(
    private authService: AuthService, // private jwtService: JwtService,
  ) {}
  @Get('email/verify/:token')
  @ApiOperation({
    summary: 'Verify email',
    description: 'Verify email',
  })
  @ApiParam({
    name: 'token',
    description: 'Token email of user',
  })
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('email/resend-verification/:email')
  @ApiOperation({
    summary: 'Resend verification email',
    description: 'Resend verification email',
  })
  @ApiParam({
    name: 'email',
    description: 'Email of user',
  })
  async sendEmailVerification(@Param('email') email: string) {
    this.authService.resendVerificationEmail(email);
  }

  @Get('email/forgot-password/:email')
  @ApiOperation({
    summary: 'Send email forgot password',
    description: 'Send email forgot password',
  })
  @ApiParam({
    name: 'email',
    description: 'Email of user',
  })
  async sendEmailForgotPassword(@Param('email') email: string) {
    return this.authService.createForgottenPasswordToken(email);
  }

  @Post('refresh')
  refresh(@Body() body) {
    return this.authService.handleRefreshToken(body.refreshToken);
  }

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

  @Post('email/reset-password')
  @ApiOperation({
    summary: 'Reset Password',
    description: 'Reset Password',
  })
  async setNewPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.handleChangePassword(resetPassword);
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
