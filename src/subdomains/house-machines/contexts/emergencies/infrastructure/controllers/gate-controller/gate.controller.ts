import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpenGatesUseCase } from '../../../application/use-cases';
import { RegisterGateUseCase } from '../../../application/use-cases/register-gate/register-gate.use-case';
import { IOpenGateCommand } from '../../../domain/interfaces/commands/open-gate.command';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';
import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { OpenedGatePublisher } from '../../messaging/publisher/opened-gate.publisher';
import { RegisteredGatePublisher } from '../../messaging/publisher/registered-gate.publisher';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';
import { GateService } from '../../persistence/servicies/gate.service';

@Controller('gate')
export class GateController {
  constructor(
    private readonly gateService: GateService,
    private readonly openedGatePublisher: OpenedGatePublisher,
    private readonly registeredGatePublisher: RegisteredGatePublisher,
  ) {}
  @Get(':id')
  getGateById(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.getGateById(id.gateId);
  }
  @Get('close-gates/:id')
  closeGates(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.closeGates(id.gateId);
  }
  @Get('open-gates/:id')
  async openGates(@Param() id: IOpenGateCommand): Promise<IOpenGateResponse> {
    const useCase = new OpenGatesUseCase(
      this.gateService,
      this.openedGatePublisher,
    );
    return await useCase.execute(id);
  }
  @Post('change-state-gate/:id')
  changeStateGate(
    @Param() id: { gateId: string },
    @Body() value: { value: boolean },
  ): Promise<boolean> {
    return this.gateService.changeStateGate(id.gateId, value.value);
  }
  @Post('register')
  async registerGate(
    @Body() entity: IRegisterGateCommand,
  ): Promise<IRegisteredGateResponse> {
    const useCase = new RegisterGateUseCase(
      this.gateService,
      this.registeredGatePublisher,
    );
    return await useCase.execute(entity);
  }
}
