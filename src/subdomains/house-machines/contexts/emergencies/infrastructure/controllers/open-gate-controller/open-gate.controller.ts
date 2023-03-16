import { Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { GetRegisterOpenGateActionByIdUseCase } from '../../../application/use-cases';
import { RegisterOpenGateActionUseCase } from '../../../application/use-cases/register-open-gate-action';
import {
  IGetRegisterOpenGateActionCommand,
  IGotRegisterOpenGateActionReponse,
  IRegisteredOpenACtionResponse,
} from '../../../domain';
import { GotRegisterOpenGatePublisher } from '../../messaging/publisher/got-register-open-action-by-id.publisher';
import { RegisteredOpenGatePublisher } from '../../messaging/publisher/registered-open-gate-action.publisher';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { OpenGateService } from '../../persistence/servicies/open-gate.service';
import { GetRegisterOpenGateActionCommand } from '../../utils/commands/get-register-open-gate-action.command';
import { RegisterOpenActionCommand } from '../../utils/commands/register-open-action.command';

@Controller('open-gate')
export class OpenGateController {
  constructor(
    private readonly openGateService: OpenGateService,
    private readonly registeredOpenGateEvent: RegisteredOpenGatePublisher,
    private readonly gotRegisterOpenActionById: GotRegisterOpenGatePublisher,
  ) {}
  @Get()
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateService.getHistoryOpenAction();
  }
  @Get(':id')
  async GetOpenAction(
    @Param() id: GetRegisterOpenGateActionCommand,
  ): Promise<IGotRegisterOpenGateActionReponse> {
    const useCase = new GetRegisterOpenGateActionByIdUseCase(
      this.openGateService,
      this.gotRegisterOpenActionById,
    );
    return await useCase.execute(id);
  }
  @Post()
  async registerOpenAction(
    commandOpengate: RegisterOpenActionCommand,
  ): Promise<IRegisteredOpenACtionResponse> {
    const useCase = new RegisterOpenGateActionUseCase(
      this.openGateService,
      this.registeredOpenGateEvent,
    );
    return await useCase.execute(commandOpengate);
  }
}
