export interface UserResponse{
    id: string;
    status: boolean;
    createdAt: Date;
    name: string;
    sex: string;
    age: number;
    document: string;
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