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

    @IsOptional()
    @IsString({ message: 'Street is must be a string' })
    street?: string;

    @IsOptional()
    @IsString({ message: 'Number is must be a string' })
    number?: string;

    @IsOptional()
    @IsString({ message: 'Number is must be a string' })
    block?: string;

    @IsOptional()
    @IsString({ message: 'Number is must be a string' })
    apartment?: string;

    @IsOptional()
    @IsString({ message: 'Country is must be a string' })
    country?: string;

    @IsOptional()
    @IsString({ message: 'City is must be a string' })
    city?: string;

    @IsOptional()
    @IsString({ message: 'District is must be a string' })
    district?: string;
}