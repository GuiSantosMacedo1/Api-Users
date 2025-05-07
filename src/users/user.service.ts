import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(data: CreateUserDto) {
        return this.userRepository.create(data);
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(id: string) {
        return this.userRepository.findById(id);
    }
}   
