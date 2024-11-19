import {IsString, IsNumber, IsBoolean, IsOptional} from 'class-validator';

export class FilterUserDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
    
    @IsOptional()
    age: number;

    @IsOptional()
    isThereATrouble: boolean;
    
    @IsOptional()
    limit: number;
    
    @IsOptional()
    page: number;
}
