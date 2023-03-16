import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';
import { GateService } from '../../persistence/servicies/gate.service';

@Controller('gate')
export class GateController {
  constructor(private readonly gateService: GateService) {}
  @Get(':id')
  getGateById(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.getGateById(id.gateId);
  }
  @Get('close-gates/:id')
  closeGates(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.closeGates(id.gateId);
  }
  @Get('open-gates/:id')
  openGates(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.openGates(id.gateId);
  }
  @Post('change-state-gate/:id')
  changeStateGate(
    @Param() id: { gateId: string },
    @Body() value: { value: boolean },
  ): Promise<boolean> {
    return this.gateService.changeStateGate(id.gateId, value.value);
  }
  @Post('register')
  registerGate(@Body() entity: IRegisterGateCommand): Promise<GateEntity> {
    return this.gateService.registerGate(entity);
  }
}
