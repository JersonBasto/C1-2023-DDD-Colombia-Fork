import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { EmergenciesModule } from './subdomains/house-machines/contexts/emergencies/infrastructure/emergency.module';
import { PostgersSQLModule } from './subdomains/house-machines/contexts/emergencies/infrastructure/persistence/postgresSQL.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    PostgersSQLModule,
    EmergenciesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
