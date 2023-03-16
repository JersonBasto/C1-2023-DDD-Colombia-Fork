import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GateDomainEntity } from './subdomains/house-machines/contexts/emergencies';
import { IRegisterGateCommand } from './subdomains/house-machines/contexts/emergencies/domain/interfaces/commands/register-gate.command';
import { GateEntity } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/entities/gate-entity/gate-entity.entity';
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
  @Get(':id')
  getAll(@Param() id:{id: string}): Promise<GateEntity> {
    console.log(id.id)
    return this.gateService.getGateById(id.id);
  }
  @Post()
  create(@Body() gateCommand: IRegisterGateCommand): Promise<GateDomainEntity> {
    return this.gateService.registerGate(gateCommand);
  }
}
