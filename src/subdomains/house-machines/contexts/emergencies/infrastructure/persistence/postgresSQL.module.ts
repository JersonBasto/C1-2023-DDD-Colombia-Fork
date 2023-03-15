import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfigService } from './databases/postgres/configs/type-orm-postgres-config.service';
import { CloseGateEntity } from './entities/close-gate-entity/close-gate.entity';
import { OpenGateEntity } from './entities/open-gate-entity/open-gate.entity';
import { OpenGateRepository } from './repositories/open-gate-repository/open-gate.repository';
import { OpenGateService } from './servicies/open-gate.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([OpenGateEntity, CloseGateEntity]),
  ],
  controllers: [],
  providers: [
    TypeOrmPostgresConfigService,
    OpenGateRepository,
    OpenGateService,
  ],
  exports: [OpenGateRepository, OpenGateService],
})
export class PostgersSQLModule {}
