import { Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { RegisterOpenGateActionUseCase } from '../../../application/use-cases/register-open-gate-action';
import {
  IRegisteredOpenACtionResponse,
  IRegisterOpenActionCommand,
  RegisteredOpenedActionEventPublisher,
  Topic,
} from '../../../domain';
import { RegisteredOpenGatePublisher } from '../../messaging/publisher/registered-open-gate-action.publisher';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { OpenGateService } from '../../persistence/servicies/open-gate.service';

@Controller('open-gate')
export class OpenGateController {
  constructor(
    private readonly openGateService: OpenGateService,
    private readonly registerOpenGateEvent: RegisteredOpenGatePublisher,
  ) {}
  @Get()
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateService.getHistoryOpenAction();
  }
  @Get(':id')
  GetOpenAction(@Param() id: { gateId: string }): Promise<OpenGateEntity> {
    return this.openGateService.getOpenGateById(id.gateId);
  }
  @Post()
  async registerOpenAction(
    commandOpengate: IRegisterOpenActionCommand,
  ): Promise<IRegisteredOpenACtionResponse> {
    const useCase = new RegisterOpenGateActionUseCase(
      this.openGateService,
      this.registerOpenGateEvent,
    );
    return await useCase.execute(commandOpengate);
  }
}
