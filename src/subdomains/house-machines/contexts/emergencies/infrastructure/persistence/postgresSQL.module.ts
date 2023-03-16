import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../../domain/events/enum';
import { CloseGateController } from '../controllers/close-gate-controller/close-gate.controller';
import { GateController } from '../controllers/gate-controller/gate.controller';
import { OpenGateController } from '../controllers/open-gate-controller/open-gate.controller';
import { TypeOrmPostgresConfigService } from './databases/postgres/configs/type-orm-postgres-config.service';
import { CloseGateEntity } from './entities/close-gate-entity/close-gate.entity';
import { GateEntity } from './entities/gate-entity/gate-entity.entity';
import { OpenGateEntity } from './entities/open-gate-entity/open-gate.entity';
import { CloseGateRepository } from './repositories/close-gate-repository/close-gate.repository';
import { GateRepository } from './repositories/gate-repository/gate.repository';
import { OpenGateRepository } from './repositories/open-gate-repository/open-gate.repository';
import { CloseGateService } from './servicies/close-gate.service';
import { GateService } from './servicies/gate.service';
import { OpenGateService } from './servicies/open-gate.service';
import { RegisteredOpenGatePublisher } from '../messaging/publisher/registered-open-gate-action.publisher';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([OpenGateEntity, CloseGateEntity, GateEntity]),
    ClientsModule.register([
      {
        name: 'EMERGENCIES_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'EMERGENCIES_CONTEXT',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [CloseGateController, GateController, OpenGateController],
  providers: [
    TypeOrmPostgresConfigService,
    OpenGateRepository,
    OpenGateService,
    GateService,
    GateRepository,
    CloseGateService,
    CloseGateRepository,
    RegisteredOpenGatePublisher
  ],
  exports: [
    OpenGateRepository,
    OpenGateService,
    GateRepository,
    GateService,
    CloseGateRepository,
    CloseGateService,
  ],
})
export class PostgersSQLModule {}
