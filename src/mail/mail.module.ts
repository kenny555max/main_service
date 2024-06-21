import { Global, Logger, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Global()
@Module({
  controllers: [MailController],
  providers: [MailService, Logger],
  exports: [MailService],
})
export class MailModule {}
