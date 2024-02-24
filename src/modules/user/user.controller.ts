import { Controller, Get, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')  
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number) {
    return this.userService.update(id);
  }
}
