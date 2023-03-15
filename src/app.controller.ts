import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenGateEntity } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/entities/open-gate-entity/open-gate.entity';
import { OpenGateService } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/servicies/open-gate.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly openGateService: OpenGateService,
  ) {}
  @Get()
  getAll(): Promise<OpenGateEntity[]> {
    return this.openGateService.getHistoryOpenAction();
  }
}
