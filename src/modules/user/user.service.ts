import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { OkPacket, RowDataPacket } from 'mysql';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const connection = this.databaseService.getConnection();
    const [users] = await connection.query<RowDataPacket[]>('SELECT * FROM USER');
    return users;
  }

  async findOne(id: number) {
    const connection = this.databaseService.getConnection();
    const [user] = await connection.query<RowDataPacket[]>('SELECT * FROM USER WHERE id_user = ?', [id]);
    if (!user.length) {
      throw new NotFoundException('User not found');
    }
    return user[0];
  }

  async remove(id: number) {
    const connection = this.databaseService.getConnection();
    const [deletedUser] = await connection.query<OkPacket>('DELETE FROM USER WHERE id_user = ?', [id]);
    if (!deletedUser.affectedRows) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async update(id: number) {
    const connection = this.databaseService.getConnection();
    const [updatedUser] = await connection.query<OkPacket>('UPDATE USER SET ? WHERE id_user = ?', [id]);
    if (!updatedUser.affectedRows) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User updated successfully' };
  }
}
