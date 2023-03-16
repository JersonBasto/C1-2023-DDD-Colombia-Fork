import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { RegisteredOpenGatePublisher } from './publisher/registered-open-gate-action.publisher';

@Module({
  providers: [],
  exports: [],
  imports: [],
  controllers: [],
})
export class MessagingModule {}
