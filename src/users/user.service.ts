import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "./dtos/update-user.dto";

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
    async updateUser(id: string, data: UpdateUserDto) {
        return this.userRepository.update(id, data);
    }
    async deleteUser(id: string) {
        return this.userRepository.delete(id);
    }

}   
