import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/database/entities/auth.entities';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
