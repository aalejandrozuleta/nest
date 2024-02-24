import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseService = app.get(DatabaseService);
  const port: number = 5417;
  await databaseService.connect();

  // Configuración de middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  await app.listen(port);
  console.log(`Servidor Nest.js escuchando en el puerto ${port}`);
}
bootstrap();
