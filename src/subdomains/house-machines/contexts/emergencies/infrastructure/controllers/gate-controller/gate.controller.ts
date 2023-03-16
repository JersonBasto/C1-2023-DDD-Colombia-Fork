import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpenGatesUseCase } from '../../../application/use-cases';
import { CloseGatesUseCase } from '../../../application/use-cases/close-gates/close-gates.use-case';
import { RegisterGateUseCase } from '../../../application/use-cases/register-gate/register-gate.use-case';
import { ICloseGateResponse } from '../../../domain/interfaces/responses/closed-gate.response';
import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { ClosedGatePublisher } from '../../messaging/publisher/closed-gate.publisher';
import { OpenedGatePublisher } from '../../messaging/publisher/opened-gate.publisher';
import { RegisteredGatePublisher } from '../../messaging/publisher/registered-gate.publisher';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';
import { GateService } from '../../persistence/servicies/gate.service';
import { CloseGateCommand } from '../../utils/commands/close-gate.command';
import { OpenGateCommand } from '../../utils/commands/open-gate.command';
import { RegisterGateCommand } from '../../utils/commands/register-gate.command';

@Controller('gate')
export class GateController {
  constructor(
    private readonly gateService: GateService,
    private readonly openedGatePublisher: OpenedGatePublisher,
    private readonly registeredGatePublisher: RegisteredGatePublisher,
    private readonly closedGatePublisher: ClosedGatePublisher,
  ) {}
  @Get(':id')
  getGateById(@Param() id: { gateId: string }): Promise<GateEntity> {
    return this.gateService.getGateById(id.gateId);
  }
  @Get('close-gates/:id')
  async closeGates(
    @Param() id: CloseGateCommand,
  ): Promise<ICloseGateResponse> {
    const useCase = new CloseGatesUseCase(
      this.gateService,
      this.closedGatePublisher,
    );

    return await useCase.execute(id);
  }
  @Get('open-gates/:id')
  async openGates(@Param() id: OpenGateCommand): Promise<IOpenGateResponse> {
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
    @Body() entity: RegisterGateCommand,
  ): Promise<IRegisteredGateResponse> {
    const useCase = new RegisterGateUseCase(
      this.gateService,
      this.registeredGatePublisher,
    );
    return await useCase.execute(entity);
  }
}
