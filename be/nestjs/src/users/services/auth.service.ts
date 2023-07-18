import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../http/dtos/create-user.dto';
import { UserLoginDto } from '../http/dtos/user-login.dto';
import { UserService } from './user.service';
import { RoleEnum } from '../enums/role.enum';
import { RoleService } from 'src/roles/services/role.service';
import { UserEntity } from '../entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private roleService: RoleService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
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
    const passwordDto = body.password;
    const user = await this.userService.create(body);

    const token = await this.createToken(body.email);
    await this.mailService.sendMail({
      to: body.email,
      subject: 'Đăng ký tài khoản thành công',
      template: 'register-success',
      context: {
        email: body.email,
        password: passwordDto,
      },
    });

    return {
      email: user.email,
      ...token,
    };
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
}
