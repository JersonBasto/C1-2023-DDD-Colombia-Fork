import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  AggregateRootException,
  ValueObjectException,
} from 'src/shared/sofka/exceptions';
import { Response } from 'express';

/**
 *
 * Se captura el error y lo muestra sin necesidad de estallar el sistema
 *
 * @export InternalServerErrorException
 * @class InternalServerErrorExceptionFilter
 * @implements {ExceptionFilter<InternalServerErrorException>}
 */
@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter
  implements ExceptionFilter<InternalServerErrorException>
{
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({ statusCode: status, message });
  }
}
