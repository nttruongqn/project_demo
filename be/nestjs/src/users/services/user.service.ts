import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../http/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../http/dtos/user-login.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto): Promise<UserEntity> {
    body.password = await bcrypt.hash(body.password, 10);
    const userExisted = await this.findByEmail(body.email);
    if (userExisted) {
      throw new HttpException('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(body);
  }

  async findByLogin(body: UserLoginDto): Promise<UserEntity> {
    const userExisted = await this.findByEmail(body.email);
    if (!userExisted) {
      throw new HttpException(
        'Tài khoản không tồn tại',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isEqual = bcrypt.compareSync(body.password, userExisted.password);
    if (!isEqual) {
      throw new HttpException('Đăng nhập thất bại', HttpStatus.UNAUTHORIZED);
    }

    return userExisted;
  }

  async findOne(condition: any): Promise<UserEntity> {
    return this.userRepository.findOne(condition);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }
}
