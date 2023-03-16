import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class EmergenciesModule {}
