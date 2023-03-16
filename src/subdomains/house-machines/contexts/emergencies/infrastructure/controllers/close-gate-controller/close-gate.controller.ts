import { Controller, Get } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { ICloseGateCommand } from '../../../domain/interfaces/commands/close-gate.command';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { CloseGateEntity } from '../../persistence/entities/close-gate-entity/close-gate.entity';
import { CloseGateService } from '../../persistence/servicies/close-gate.service';

@Controller('close-gate')
export class CloseGateController {
  constructor(private readonly closeGateService: CloseGateService) {}
  @Get('find-by-id/:id')
  findById(@Param() id: { gateId: string }): Promise<CloseGateEntity> {
    return this.closeGateService.getCloseGateById(id.gateId);
  }
  @Get('find-all')
  findAll(): Promise<CloseGateEntity[]> {
    return this.closeGateService.getHistoryCloseAction();
  }
  @Post()
  registerCloseAction(
    @Body() commandCloseGate: IRegisterCloseActionCommand,
  ): Promise<CloseGateEntity> {
    return this.closeGateService.registerCloseAction(commandCloseGate);
  }
}
