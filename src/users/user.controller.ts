import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './user-response.interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body()body: CreateUserDto): Promise<UserResponse | null> {
    return this.userService.createUser(body);
}

  @Get()
  async findAll(): Promise<UserResponse[] | null> {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse | null> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponse | null> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id')id: string): Promise<UserResponse | null> {
    return this.userService.deleteUser(id);
  }
}
