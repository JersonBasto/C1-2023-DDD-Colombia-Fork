import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
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
 * @export AggregateRootExceptionFilter
 * @class AggregateRootExceptionFilter
 * @implements {ExceptionFilter<AggregateRootException>}
 */
@Catch(AggregateRootException)
export class AggregateRootExceptionFilter
  implements ExceptionFilter<AggregateRootException>
{
  catch(exception: AggregateRootException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({ statusCode: status, message });
  }
}
