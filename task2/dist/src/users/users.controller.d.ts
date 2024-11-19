import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(filterUserDto: FilterUserDto): Promise<import("./entities/user.entity").User[]>;
    setTroublesToAll(): Promise<{
        updatedUsers: number;
    }>;
    resolveAllTroubles(): Promise<{
        updatedUsers: number;
    }>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
