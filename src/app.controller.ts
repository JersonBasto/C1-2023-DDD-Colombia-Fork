import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GateDomainEntity } from './subdomains/house-machines/contexts/emergencies';
import { IRegisterGateCommand } from './subdomains/house-machines/contexts/emergencies/domain/interfaces/commands/register-gate.command';
import { OpenGateEntity } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/entities/open-gate-entity/open-gate.entity';
import { CloseGateService } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/servicies/close-gate.service';
import { GateService } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/servicies/gate.service';
import { OpenGateService } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/servicies/open-gate.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly openGateService: OpenGateService,
    private readonly closeGateService: CloseGateService,
    private readonly gateService: GateService,
  ) {}
  @Get()
  getAll(): Promise<OpenGateEntity[]> {
    return this.openGateService.getHistoryOpenAction();
  }
  @Post()
  create(@Body() gateCommand: IRegisterGateCommand): Promise<GateDomainEntity> {
    return this.gateService.registerGate(gateCommand);
  }
}
