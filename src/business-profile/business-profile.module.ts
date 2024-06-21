import { Module } from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { BusinessProfileController } from './business-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessProfileEntity } from 'src/database/entities/business-profile.entity';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessProfileEntity]),
    AuthModule,
    CloudinaryModule,
  ],
  exports: [TypeOrmModule.forFeature([BusinessProfileEntity])],
  providers: [BusinessProfileService, UserService, CloudinaryService],
  controllers: [BusinessProfileController],
})
export class BusinessProfileModule {}
