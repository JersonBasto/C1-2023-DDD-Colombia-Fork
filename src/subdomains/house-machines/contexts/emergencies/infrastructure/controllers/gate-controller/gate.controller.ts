import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { OpenGatesUseCase } from '../../../application/use-cases';
import { CloseGatesUseCase } from '../../../application/use-cases/close-gates/close-gates.use-case';
import { RegisterGateUseCase } from '../../../application/use-cases/register-gate/register-gate.use-case';
import { ICloseGateResponse } from '../../../domain/interfaces/responses/closed-gate.response';
import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { BadRequestSwagger } from '../../../swagger/bad-request.swagger';
import { IndexGateSwagger } from '../../../swagger/index-gate.swagger';
import { ClosedGatePublisher } from '../../messaging/publisher/closed-gate.publisher';
import { OpenedGatePublisher } from '../../messaging/publisher/opened-gate.publisher';
import { RegisteredGatePublisher } from '../../messaging/publisher/registered-gate.publisher';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';
import { GateService } from '../../persistence/servicies/gate.service';
import { CloseGateCommand } from '../../utils/commands/close-gate.command';
import { GetGateByIdCommand } from '../../utils/commands/get-gate-by-id.command';
import { OpenGateCommand } from '../../utils/commands/open-gate.command';
import { RegisterGateCommand } from '../../utils/commands/register-gate.command';


/**
 *
 * Se crea el controlador para las acciones del servicio de GateService
 *
 * @export GateController
 * @class GateController
 */
@Controller('gate')
@ApiTags('Gate')
export class GateController {
  constructor(
    private readonly gateService: GateService,
    private readonly openedGatePublisher: OpenedGatePublisher,
    private readonly registeredGatePublisher: RegisteredGatePublisher,
    private readonly closedGatePublisher: ClosedGatePublisher,
  ) {}
  @Get(':id')
  @ApiOperation({ summary: 'Se obtiene el item Gate a traves del Id' })
  @ApiResponse({
    status: 200,
    description: 'Item Gate obtenido',
    type: IndexGateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'Item Gate no encotrado' })
  getGateById(@Param() id: GetGateByIdCommand): Promise<GateEntity> {
    return this.gateService.getGateById(id.id);
  }
  @Get('close-gates/:id')
  @ApiOperation({ summary: 'Cierra el item Gate con el id ingresado' })
  @ApiResponse({
    status: 200,
    description: 'Puerta cerrado',
    type: IndexGateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'No cumple los requisitos para cerrar',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'La puerta no ha sido encontrada' })
  async closeGates(@Param() id: CloseGateCommand): Promise<ICloseGateResponse> {
    const useCase = new CloseGatesUseCase(
      this.gateService,
      this.closedGatePublisher,
    );

    return await useCase.execute(id);
  }
  @Get('open-gates/:id')
  @ApiOperation({ summary: 'Abre el item Gate con el id ingresado' })
  @ApiResponse({
    status: 200,
    description: 'Puerta abierta',
    type: IndexGateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'No cumple requisitos para abrir',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'La puerta no ha sido encontrada' })
  async openGates(@Param() id: OpenGateCommand): Promise<IOpenGateResponse> {
    const useCase = new OpenGatesUseCase(
      this.gateService,
      this.openedGatePublisher,
    );
    return await useCase.execute(id);
  }
  @Post('change-state-gate/:id')
  @ApiOperation({ summary: 'Cambia el estado de Gate con el id ingresado' })
  @ApiResponse({
    status: 200,
    description: 'Cambio realizado',
    type: IndexGateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({ status: 404, description: 'Item Gate no encotrado' })
  changeStateGate(
    @Param() id: { gateId: string },
    @Body() value: { value: boolean },
  ): Promise<boolean> {
    return this.gateService.changeStateGate(id.gateId, value.value);
  }
  @Post('register')
  @ApiOperation({ summary: 'Se registra el item Gate' })
  @ApiResponse({
    status: 200,
    description: 'Gate registrada',
    type: IndexGateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
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
