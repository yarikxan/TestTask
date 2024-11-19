import { IsString, IsBoolean, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string

    @IsNumber()
    @IsPositive()
    readonly age: number;
    
    @IsOptional()
    @IsBoolean()
    isThereATrouble?: boolean;
}
