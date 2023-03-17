import { Controller, Get } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterCloseGateActionUseCase } from '../../../application';
import { CloseGatesUseCase } from '../../../application/use-cases/close-gates/close-gates.use-case';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { IRegisteredCloseACtionResponse } from '../../../domain/interfaces/responses/registered-close-action.response';
import { BadRequestSwagger } from '../../../swagger/bad-request.swagger';
import { IndexCloseGateActionSwagger } from '../../../swagger/index-close-gate.swagger';
import { RegisteredCloseGatePublisher } from '../../messaging/publisher/registered-close-gate-action.publisher';
import { CloseGateEntity } from '../../persistence/entities/close-gate-entity/close-gate.entity';
import { CloseGateService } from '../../persistence/servicies/close-gate.service';
import { RegisterCloseActionCommand } from '../../utils/commands/register-close-gate.command';

/**
 *
 * Se crea el controlador para las acciones del servicio de CloseGateService
 *
 * @export CloseGateController
 * @class CloseGateController
 */
@Controller('close-gate')
@ApiTags('CloseGateAction')
export class CloseGateController {
  constructor(
    private readonly closeGateService: CloseGateService,
    private readonly registeredCloseGatePublisher: RegisteredCloseGatePublisher,
  ) {}

  @Get('find-by-id/:id')
  @ApiOperation({
    summary: 'Se obtiene un item CloseGateAction a traves del Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Item CloseGateAction obtenido',
    type: IndexCloseGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Item CloseGateAction no encotrado',
  })
  findById(@Param() id: { gateId: string }): Promise<CloseGateEntity> {
    return this.closeGateService.getCloseGateById(id.gateId);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Se obtiene todos los item CloseGateAction',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Item CloseGateAction obtenido',
    type: IndexCloseGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Item CloseGateAction no encotrado',
  })
  findAll(): Promise<CloseGateEntity[]> {
    return this.closeGateService.getHistoryCloseAction();
  }

  @Post()
  @ApiOperation({
    summary: 'Se crea un item CloseGateAction',
  })
  @ApiResponse({
    status: 200,
    description: 'Item CloseGateAction creado',
    type: IndexCloseGateActionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error',
    type: BadRequestSwagger,
  })
  async registerCloseAction(
    @Body() commandCloseGate: RegisterCloseActionCommand,
  ): Promise<IRegisteredCloseACtionResponse> {
    const useCase = new RegisterCloseGateActionUseCase(
      this.closeGateService,
      this.registeredCloseGatePublisher,
    );
    return await useCase.execute(commandCloseGate);
  }
}
