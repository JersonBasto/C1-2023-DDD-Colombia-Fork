import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CloseGateEntity } from '../../../entities/close-gate-entity/close-gate.entity';
import { GateEntity } from '../../../entities/gate-entity/gate-entity.entity';
import { OpenGateEntity } from '../../../entities/open-gate-entity/open-gate.entity';

@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string | undefined,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [OpenGateEntity, CloseGateEntity, GateEntity],
      synchronize: true,
      logging: true,
    };
  }
}
