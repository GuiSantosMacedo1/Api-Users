import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({ message: 'Status is required' })
    @IsBoolean({ message: 'Should be a boolean' })
    status: boolean;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Sex is required' })
    sex: string;

    @IsNotEmpty({ message: 'Age is required' })
    age: number;
    
    @IsNotEmpty({ message: 'Document is required' })
    document: string;

    @IsNotEmpty({ message: 'Street is required' })
    street: string;

    @IsNotEmpty({ message: 'Number is required' })
    number: string;

    @IsOptional()
    block?: string;

    @IsOptional()
    apartment?: string;

    @IsNotEmpty({ message: 'Country is required' })
    country: string;

    @IsNotEmpty({ message: 'City is required' })
    city: string;

    @IsNotEmpty({ message: 'District is required' })
    district: string;
}