import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './database/entities/auth.entities';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { BusinessProfileModule } from './business-profile/business-profile.module';
import configuration from './config/env.config';
import { BusinessProfileController } from './business-profile/business-profile.controller';
import { BusinessProfileService } from './business-profile/business-profile.service';
import { BusinessProfileEntity } from './database/entities/business-profile.entity';
import { UserService } from './user/user.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/error-with-nestjs-integration';
import { ErrorHandler, ErrorManager } from './utils/enhanced-error-manager';
import { PassportModule } from '@nestjs/passport';
import { RtStrategy } from './strategies/refresh-jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthGuard } from './guards/auth.guard';

//DB_USER="sul2root"
@Module({
  imports: [
    AuthModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'missionIMPOSSIBLE3@MYSQL',
      database: 'emedics',
      entities: [AuthEntity, BusinessProfileEntity],
      synchronize: true,
    }),
    PassportModule,
    UserModule,
    BusinessProfileModule,
    ForgotPasswordModule,
    ProductModule,
  ],
  controllers: [AppController, BusinessProfileController, ProductController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: ErrorManager,
      useValue: ErrorHandler,
    },
    { provide: 'APP_GUARD', useClass: AuthGuard },
    AppService,
    BusinessProfileService,
    UserService,
    CloudinaryService,
    RtStrategy,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AppModule {}
