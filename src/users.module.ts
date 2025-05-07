import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { PrismaService } from './users/prisma.service';
import { UserRepository } from './users/user.repository';
import { UserService } from './users/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UsersModule {}
