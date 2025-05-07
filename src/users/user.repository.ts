import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserResponse } from "./user-response.interface";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDto): Promise<UserResponse> {
	const createUser = await this.prisma.user.create({
        data: {
            ...data,
        },
    });

    return this.mapToUserResponse(createUser);
}

async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapToUserResponse(user));

}

async findById(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
        where: { id },
    });

    return user ? this.mapToUserResponse(user): null
}


private mapToUserResponse(user: any): UserResponse {
    return {
        id: user.id,
        status: user.status,
        createdAt: user.createdAt,
        name: user.name,
        age: user.age,
        sex: user.sex,
        document: user.document,
        address:{
            street: user.street,
            number: user.number,
            block: user.block,
            apartment: user.apartment,
            country: user.country,
            city: user.city,
            district: user.district,
        }
    };
}
}
