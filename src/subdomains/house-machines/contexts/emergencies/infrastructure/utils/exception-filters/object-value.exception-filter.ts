import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValueObjectException } from 'src/shared/sofka/exceptions';
import { Response } from 'express';

@Catch(ValueObjectException)
export class ObjectValueExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const status = HttpStatus.BAD_REQUEST;
    const error = exception.errors;

    response.status(status).json({ statusCode: status, message, error });
  }
}
