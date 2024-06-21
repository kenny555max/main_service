import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/database/entities/auth.entities';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, UserService, AuthService],
})
export class ForgotPasswordModule {}
