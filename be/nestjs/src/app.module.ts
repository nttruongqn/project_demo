import { BrandModule } from './brands/brand.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { CategoryModule } from './categories/category.module';
import { MobileSystemModule } from './mobile-systems/mobile-system.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DashboardModule } from './dashboards/dashboard.module';

@Module({
  imports: [
    BrandModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('MAIL_TRANSPORT'),
        transport: {
          host: config.get('MAIL_HOST'),
          // secure: true,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, './templates/emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
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
    MobileSystemModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
