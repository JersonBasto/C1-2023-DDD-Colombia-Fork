import { Body, Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRegisterOpenGateActionByIdUseCase } from '../../../application/use-cases';
import { RegisterOpenGateActionUseCase } from '../../../application/use-cases/register-open-gate-action';
import {
  IGotRegisterOpenGateActionReponse,
  IRegisteredOpenACtionResponse,
} from '../../../domain';
import { BadRequestSwagger } from '../../../swagger/bad-request.swagger';
import { IndexOpenGateActionSwagger } from '../../../swagger/index-open-gate-action.swagger';
import { GotRegisterOpenGatePublisher } from '../../messaging/publisher/got-register-open-action-by-id.publisher';
import { RegisteredOpenGatePublisher } from '../../messaging/publisher/registered-open-gate-action.publisher';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { OpenGateService } from '../../persistence/servicies/open-gate.service';
import { GetRegisterOpenGateActionCommand } from '../../utils/commands/get-register-open-gate-action.command';
import { RegisterOpenActionCommand } from '../../utils/commands/register-open-action.command';

@Controller('open-gate')
@ApiTags('OpenGateAction')
export class OpenGateController {
  constructor(
    private readonly openGateService: OpenGateService,
    private readonly registeredOpenGateEvent: RegisteredOpenGatePublisher,
    private readonly gotRegisterOpenActionById: GotRegisterOpenGatePublisher,
  ) {}
  @Get()
  @ApiOperation({
    summary: 'Se obtiene todos los item OpenGateAction',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Item OpenGateAction obtenido',
    type: IndexOpenGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'Item OpenGateAction no encotrado' })
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateService.getHistoryOpenAction();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Se obtiene el item OpenGateAction a traves del Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Item OpenGateAction obtenido',
    type: IndexOpenGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'Item OpenGateAction no encotrado' })
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
  @ApiOperation({
    summary: 'Se crea el item OpenGateAction',
  })
  @ApiResponse({
    status: 200,
    description: 'Item OpenGateAction creado',
    type: IndexOpenGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  async registerOpenAction(
    @Body() commandOpengate: RegisterOpenActionCommand,
  ): Promise<IRegisteredOpenACtionResponse> {
    console.log(commandOpengate);
    const useCase = new RegisterOpenGateActionUseCase(
      this.openGateService,
      this.registeredOpenGateEvent,
    );
    return await useCase.execute(commandOpengate);
  }
}
