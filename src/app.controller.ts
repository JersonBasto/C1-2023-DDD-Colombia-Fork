import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class AppController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  getHelloWorld(): string | undefined {
    return this.configService.get<string>('DB_NAME');
  }
}
