import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../http/dtos/create-user.dto';
import { UserLoginDto } from '../http/dtos/user-login.dto';
import { UserService } from './user.service';
import { RoleEnum } from '../enums/role.enum';
import { RoleService } from 'src/roles/services/role.service';
import { UserEntity } from '../entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { UserStatusEnum } from '../enums/user-status.enum';
import { Exception } from 'handlebars';
import { ResetPasswordDto } from '../http/dtos/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private roleService: RoleService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
    private passwordDto: string,
  ) {}

  async registerAdminAccount(body: CreateUserDto): Promise<any> {
    const adminRole = await this.roleService.findOne({ name: RoleEnum.ADMIN });
    body.roleId = adminRole.id;
    const user = await this.userService.create(body);

    const token = await this.createToken(body.email);
    return {
      email: user.email,
      ...token,
    };
  }

  async login(body: UserLoginDto): Promise<any> {
    const user = await this.userService.findByLogin(body);
    const token = await this.createToken(user.email);

    return {
      email: user.email,
      ...token,
    };
  }

  async registerUserAccount(body: CreateUserDto): Promise<any> {
    const userRole = await this.roleService.findOne({ name: RoleEnum.USER });
    body.roleId = userRole.id;
    this.passwordDto = body.password;
    body.status = UserStatusEnum.INACTIVE;
    const user = await this.userService.create(body);
    const token = await this.createToken(body.email);
    await this.createEmailToken(user.email);
    await this.sendTokenEmail(user.email);
    return {
      email: user.email,
      ...token,
    };
  }

  private async sendTokenEmail(email: string) {
    const tokenEmail = (await this.userService.findByEmail(email)).token;
    await this.mailService.sendMail({
      to: email,
      subject: 'Chúc mừng bạn đã đăng ký tài khoản',
      template: 'register',
      context: {
        host: process.env.HOST_BE_SEND,
        token: tokenEmail,
      },
    });
  }

  async validateUser(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async createToken(email, isRefreshToken = true) {
    const accessToken = this.jwtService.sign({ email });

    if (isRefreshToken) {
      const refreshToken = this.jwtService.sign(
        { email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRES_REFRESH,
        },
      );

      await this.userService.update(email, refreshToken);
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRES_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async handleRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.SECRETKEY_REFRESH,
      });

      const user = await this.userService.getUserByRefresh(
        refreshToken,
        payload.email,
      );

      const token = await this.createToken(user.email, false);

      return {
        email: user.email,
        ...token,
      };
    } catch (error) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: UserEntity) {
    await this.userService.update(user.email);
  }

  async createEmailToken(email: string) {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Can not found user by email');
    } else {
      await this.userService.updateEmailToken(user);
    }
  }

  async verifyEmail(token: string) {
    const user = await this.userService.findOne({ where: { token } });
    if (!user) {
      throw new NotFoundException('Can not found user by token');
    } else {
      await this.userService.changeStatusActiveForUser(user.id);
    }

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Đăng ký tài khoản thành công',
      template: 'register-success',
      context: {
        email: user.email,
        password: this.passwordDto,
      },
    });
  }

  async resendVerificationEmail(email: string) {
    try {
      await this.createEmailToken(email);
      await this.sendTokenEmail(email);
    } catch (error) {
      throw new Exception('Can not resend verification email');
    }
  }

  async createForgottenPasswordToken(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Không thể tìm thấy email', HttpStatus.NOT_FOUND);
    }
    await this.userService.updatePasswordToken(user);
    await this.sendPasswordTokenEmail(email);
  }

  private async sendPasswordTokenEmail(email: string) {
    const passwordToken = (await this.userService.findByEmail(email))
      .passwordToken;
    await this.mailService.sendMail({
      to: email,
      subject: 'Yêu cầu đã quên mật khẩu',
      template: 'forgotten-password',
      context: {
        email: email,
        passwordToken: passwordToken,
        host: process.env.HOST_FE_SEND,
      },
    });
  }

  async getForgottenPassword(passwordToken: string) {
    return this.userService.getForgottenPassword(passwordToken);
  }

  async handleChangePassword(resetPasswordDto: ResetPasswordDto) {
    const { currentPassword, email, newPassword, passwordToken } =
      resetPasswordDto;
    const userExisted = await this.userService.findByEmail(email);

    if (email && currentPassword) {
      const isValidPassword = bcrypt.compareSync(
        currentPassword,
        userExisted.password,
      );
      if (isValidPassword) {
        await this.userService.updatePassword(userExisted.id, newPassword);
      } else {
        throw new HttpException(
          'Mật khẩu hiện tại không chính xác',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else if (passwordToken) {
      const forgotPassword = await this.userService.getForgottenPassword(
        passwordToken,
      );
      if (forgotPassword) {
        await this.userService.updatePassword(userExisted.id, newPassword);
      } else {
        throw new HttpException(
          'Token không chính xác',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
