import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './user-response.interface';
import { UserService } from './user.service';
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

}
