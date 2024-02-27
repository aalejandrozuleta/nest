import {Controller,Get,Param,Delete,Patch,Post,Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';


@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id_user')
  async findOne(@Param('id_user') id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id_user')
  async remove(@Param('id_user') id: number) {
    return this.userService.remove(id);
  }

  @Patch(':id_user')
  async update(@Param('id_user') id: number) {
    return this.userService.update(id);
  }
}
