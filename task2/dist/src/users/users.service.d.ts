import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(filterUserDto: FilterUserDto): Promise<User[]>;
    setTroublesToAll(): Promise<{
        updatedUsers: number;
    }>;
    resolveAllTroubles(): Promise<{
        updatedUsers: number;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
