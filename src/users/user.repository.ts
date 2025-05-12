import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserResponse } from "./user-response.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDto): Promise<UserResponse> {
    const address = await this.prisma.address.create({
    data: {
      street: data.address.street,
      number: data.address.number,
      block: data.address.block,
      apartment: data.address.apartment,
      country: data.address.country,
      city: data.address.city,
      district: data.address.district,
    },
  });
  const createUser = await this.prisma.user.create({
    data: {
      status: data.status,
      name: data.name,
      age: data.age,
      sex: data.sex,
      document: data.document,
      addressId: address.id, // Associa o endereço ao usuário
    },
    include: {
      address: true, // Inclui o endereço no retorno
    },
  });


    return this.mapToUserResponse(createUser);
}

async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({
        include: {
            address: true, // Inclui o endereço no retorno
        },
    });
    return users.map((user) => this.mapToUserResponse(user));

}

async findById(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
        where: { id },
                include: {
            address: true, // Inclui o endereço no retorno
        },
    });

    return user ? this.mapToUserResponse(user): null
}

async update(id:string, data: UpdateUserDto): Promise<UserResponse | null> {
    const user = await this.prisma.user.update({
        where: { id },
        data: {
            ...data,
            address: {
                update: {
                    street: data.address.street,
                    number: data.address.number,
                    block: data.address.block,
                    apartment: data.address.apartment,
                    country: data.address.country,
                    city: data.address.city,
                    district: data.address.district,
                },
            },
          
        },
                include: {
            address: true, // Inclui o endereço no retorno
        },
    });

    return user ? this.mapToUserResponse(user): null
}
async delete(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.delete({
        where: { id },
                include: {
            address: true, // Inclui o endereço no retorno
        },
    });

    return user ? this.mapToUserResponse(user): null
}


private mapToUserResponse(user: any): UserResponse {
    console.log('User object:', user); // Log para depuração
  return {
    id: user.id,
    status: user.status,
    createdAt: user.createdAt,
    name: user.name,
    age: user.age,
    sex: user.sex,
    document: user.document,
    address: user.address || null
  };
}
}
