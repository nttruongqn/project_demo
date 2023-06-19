import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './http/controllers/user.controller';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.stragety';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './http/controllers/auth.controller';
import { RoleModule } from 'src/roles/role.module';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}
