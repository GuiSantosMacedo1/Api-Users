import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './user-response.interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { error } from 'console';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserResponse | null> {
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
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse | null> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserWithExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body('userData') userData?: string,
  ) {
    if (!file) {
      throw new Error('Arquivo não enviado.');
    }

    // Lê o Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
const [headerRaw, ...data] = rawRows;
const header: string[] = Array.isArray(headerRaw)
  ? headerRaw.map(String)
  : [];
const rows = data.map((row: any[]) => {
  const obj: any = {};
  header.forEach((col: string, idx: number) => {
    obj[col.trim().toLowerCase()] = row[idx];
  });
  return obj;
});
rows.forEach((row, idx) => {
  console.log(`Linha ${idx + 1}:`, Object.keys(row));
  console.log(`Conteúdo:`, row);
});
    // Processa os dados extras (se enviados)
    let userDataObj: Partial<CreateUserDto> = {};
    if (userData) {
      try {
        userDataObj = JSON.parse(userData);
      } catch (e) {
        console.error('userData não é um JSON válido:', userData);
      }
    }

    // Junta cada linha do Excel com os dados extras
    const usersToCreate = rows
  .filter(
    (row: any) =>
      (row.name ?? userDataObj.name) &&
      (row.sex ?? userDataObj.sex) &&
      (row.document ?? userDataObj.document) &&
      row.street &&
      row.number &&
      row.country &&
      row.city &&
      row.district,
  )
  .map((row: any) => ({
    ...userDataObj,
    status:
      typeof row.status !== 'undefined'
        ? row.status === true || row.status === 'true'
        : (userDataObj.status ?? true),
    name: row.name ?? userDataObj.name,
    sex: row.sex ?? userDataObj.sex,
    age:
      row.age !== undefined && row.age !== null && row.age !== ''
        ? Number(row.age)
        : userDataObj.age !== undefined && userDataObj.age !== null
          ? Number(userDataObj.age)
          : 0,
    document: row.document ?? userDataObj.document,
    address: {
      street: row.street,
      number: row.number,
      block: row.block,
      apartment: row.apartment,
      country: row.country,
      city: row.city,
      district: row.district,
    },
  }));
    console.log('usersToCreate:', JSON.stringify(usersToCreate, null, 2));
    console.log('rows:', JSON.stringify(rows, null, 2));
    for (const user of usersToCreate) {
      if (
        !user.name ||
        !user.sex ||
        !user.document ||
        !user.address?.street ||
        !user.address?.number ||
        !user.address?.country ||
        !user.address?.city ||
        !user.address?.district
      ) {
        throw new Error(
          'Campos obrigatórios faltando em uma das linhas do Excel ou no userData.',
        );
      }
    }
    // Aqui você pode salvar cada usuário no banco (exemplo usando userService)
    const createdUsers: UserResponse[] = [];
    for (const user of usersToCreate) {
      createdUsers.push(await this.userService.createUser(user));
    }

    // Retorna os dados processados (ou salvos)
    return {
      dadosExtras: userDataObj,
      excel: rows,
      usuariosParaCriar: usersToCreate,
      usuariosCriados: createdUsers,
    };
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserResponse | null> {
    return this.userService.deleteUser(id);
  }
}
