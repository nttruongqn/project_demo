import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../http/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../http/dtos/user-login.dto';
import { Brackets, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UserListDto } from '../http/dtos/user-list.dto';
import { RoleTypeSearchEnum } from '../enums/role-type-search.enum';

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

  async paginate(query: UserListDto): Promise<Pagination<UserEntity>> {
    const { limit, page, searchKey, roleType, sort, order } = query;
    const options: IPaginationOptions = {
      limit,
      page,
    };
    const qb = this.userRepository.createQueryBuilder('user');
    if (searchKey && searchKey.trim() !== '') {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('user.username ILIKE :username', {
            username: `%${searchKey}%`,
          }).orWhere('user.email ILIKE :email', {
            email: `%${searchKey}%`,
          });
        }),
      );
    }
    qb.leftJoinAndSelect('user.role', 'role');
    if (roleType && roleType !== RoleTypeSearchEnum.ALL) {
      qb.andWhere('role.name = :name', {
        name: roleType,
      });
    }

    if (sort && order) {
      qb.orderBy(`user.${sort}`, order);
    }
    return paginate<UserEntity>(qb, options);
  }

  async update(email: string, refreshToken?: string) {
    const user = await this.findByEmail(email);

    if (refreshToken) {
      refreshToken = await bcrypt.hash(this.reverse(refreshToken), 10);
      return this.userRepository.update(user.id, {
        refreshToken: refreshToken,
      });
    }
    return this.userRepository.update(user.id, {
      refreshToken: null,
    });
  }

  async getUserByRefresh(refreshToken, email) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const isEqual = await bcrypt.compare(
      this.reverse(refreshToken),
      user.refreshToken,
    );
    if (!isEqual) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
