import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Sena1234%',
        database: 'migration',
        Promise: global.Promise,
      });
      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      console.error('Error de conexión a la base de datos:', error.message);
      throw error;
    }
  }

  getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error('La conexión a la base de datos no ha sido establecida');
    }
    return this.connection;
  }
}
