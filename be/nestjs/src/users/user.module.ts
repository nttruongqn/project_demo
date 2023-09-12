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
import { AdminAuthController } from './http/controllers/admin-auth.controller';
import { RoleModule } from 'src/roles/role.module';
import { AuthController } from './http/controllers/auth.controller';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UserController, AdminAuthController, AuthController],
  providers: [UserService, AuthService, JwtStrategy, String],
  exports: [UserService],
})
export class UserModule {}
