import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,
  ) {}

  findOne(condition): Promise<RoleEntity> {
    console.log(condition);
    return this.roleRepo.findOne({ where: condition });
  }

  findAll(): Promise<RoleEntity[]> {
    return this.roleRepo.find();
  }
}
