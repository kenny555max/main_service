import { Logger, Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider, Logger],
  exports: [CloudinaryService, Logger],
})
export class CloudinaryModule {}
