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

    @IsNotEmpty({ message: 'Address is required' })
      @IsNotEmpty()
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
