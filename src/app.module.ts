// app.module.ts

import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { AppController } from './modules/main/main.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  providers: [DatabaseService],
  controllers: [AppController],
  imports: [UserModule],
})
export class AppModule {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService.connect().catch((error) => {
      console.error(
        'Error al conectar a la base de datos al iniciar la aplicación:',
        error,
      );
      process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
    });
  }
}
