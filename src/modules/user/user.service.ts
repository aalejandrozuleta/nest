import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { OkPacket, RowDataPacket } from 'mysql';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const connection = this.databaseService.getConnection();
    const { username, phone, email, password } = createUserDto;
    
    // Ejecuta la consulta de inserción
    const result: OkPacket = await connection.query(
      'INSERT INTO USER (username_user, phone_user, email_user, password_user) VALUES (?, ?, ?, ?)',
      [username, phone, email, password]
    );

    // Verifica si se realizó la inserción correctamente
    if (!result || !result.insertId) {
      throw new Error('Failed to create user');
    }

    // Devuelve el mensaje y el ID del usuario creado
    return { message: 'User created successfully', id: result.insertId };
  }
  async findAll() {
    const connection = this.databaseService.getConnection();
    const [users] = await connection.query<RowDataPacket[]>('SELECT * FROM USER');
    return users;
  }

  async findOne(id_user: number) {
    const connection = this.databaseService.getConnection();
    const [user] = await connection.query<RowDataPacket[]>('SELECT * FROM USER WHERE id_user = ?', [id_user]);
    if (!user.length) {
      throw new NotFoundException('User not found');
    }
    return user[0];
  }

  async remove(id_user: number) {
    const connection = this.databaseService.getConnection();
    const [deletedUser] = await connection.query<OkPacket>('DELETE FROM USER WHERE id_user = ?', [id_user]);
    if (!deletedUser.affectedRows) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async update(id_user: number) {
    const connection = this.databaseService.getConnection();
    const [updatedUser] = await connection.query<OkPacket>('UPDATE USER SET ? WHERE id_user = ?', [id_user]);
    if (!updatedUser.affectedRows) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User updated successfully' };
  }
}
