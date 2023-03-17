import { Controller, Get } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { BadRequestSwagger } from '../../../swagger/bad-request.swagger';
import { IndexCloseGateActionSwagger } from '../../../swagger/index-close-gate.swagger';
import { CloseGateEntity } from '../../persistence/entities/close-gate-entity/close-gate.entity';
import { CloseGateService } from '../../persistence/servicies/close-gate.service';

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
  constructor(private readonly closeGateService: CloseGateService) {}
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
  registerCloseAction(
    @Body() commandCloseGate: IRegisterCloseActionCommand,
  ): Promise<CloseGateEntity> {
    return this.closeGateService.registerCloseAction(commandCloseGate);
  }
}
