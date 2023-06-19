import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../http/dtos/create-user.dto';
import { UserLoginDto } from '../http/dtos/user-login.dto';
import { UserService } from './user.service';
import { RoleEnum } from '../enums/role.enum';
import { RoleService } from 'src/roles/services/role.service';

@Injectable()
export class AuthService {
  constructor(
    private roleService: RoleService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto): Promise<any> {
    const adminRole = await this.roleService.findOne({ name: RoleEnum.ADMIN });
    console.log(adminRole);
    body.roleId = adminRole.id;
    console.log('body', body);
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

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async createToken(email: string) {
    const accessToken = this.jwtService.sign({ email });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
