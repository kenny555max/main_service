import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/database/entities/auth.entities';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';

const config = new ConfigService();

@Module({
  exports: [TypeOrmModule.forFeature([AuthEntity]), AuthService],
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      global: true,
      secret: config.get('jwt.access_token_secret'),
      signOptions: { expiresIn: '60s' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule {}
