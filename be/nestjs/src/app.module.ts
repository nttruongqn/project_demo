import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { FileModule } from './files/file.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { TransactionModule } from './transactions/transaction.module';
import { ArticleModule } from './articles/article.module';
import { RatingModule } from './ratings/rating.module';
import { ContactModule } from './contacts/contact.module';
import { CategoryModule } from './categorys/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    RoleModule,
    FileModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    TransactionModule,
    ArticleModule,
    RatingModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
