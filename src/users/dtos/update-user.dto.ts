import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
    @IsOptional()
    @IsBoolean({ message: 'Should be a boolean' })
    status: boolean;

    @IsOptional()
    @IsString({ message: 'Name is must be a string' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Sex is must be a string' })
    sex?: string;

    @IsOptional()
    @IsNumber()
    age?: number;
    
    @IsOptional()
    @IsString({ message: 'Document is must be a string' })
    document?: string;

    @IsOptional({ message: 'Address is required' })
    address: {
    street: string;
    number: string;
    block?: string;
    apartment?: string;
    country: string;
    city: string;
    district: string;
  };
}