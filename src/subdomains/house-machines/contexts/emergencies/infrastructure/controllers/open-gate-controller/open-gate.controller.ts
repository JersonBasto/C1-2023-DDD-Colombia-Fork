import { Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GetRegisterOpenGateActionByIdUseCase } from '../../../application/use-cases';
import { RegisterOpenGateActionUseCase } from '../../../application/use-cases/register-open-gate-action';
import {
  IGetRegisterOpenGateActionCommand,
  IGotRegisterOpenGateActionReponse,
  IRegisteredOpenACtionResponse,
  IRegisterOpenActionCommand,
  RegisteredOpenedActionEventPublisher,
  Topic,
} from '../../../domain';
import { GotRegisterOpenGatePublisher } from '../../messaging/publisher/got-register-open-action-by-id.publisher';
import { RegisteredOpenGatePublisher } from '../../messaging/publisher/registered-open-gate-action.publisher';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { OpenGateService } from '../../persistence/servicies/open-gate.service';

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
    @Param() id: IGetRegisterOpenGateActionCommand,
  ): Promise<IGotRegisterOpenGateActionReponse> {
    const useCase = new GetRegisterOpenGateActionByIdUseCase(
      this.openGateService,
      this.gotRegisterOpenActionById,
    );
    return await useCase.execute(id);
  }
  @Post()
  async registerOpenAction(
    commandOpengate: IRegisterOpenActionCommand,
  ): Promise<IRegisteredOpenACtionResponse> {
    const useCase = new RegisterOpenGateActionUseCase(
      this.openGateService,
      this.registeredOpenGateEvent,
    );
    return await useCase.execute(commandOpengate);
  }
}
