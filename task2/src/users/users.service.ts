import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const result = await this.userRepository.create(createUserDto);
    return this.userRepository.save(result);
  }

  async findAll(filterUserDto: FilterUserDto) {
    const { firstName, lastName, age, isThereATrouble, limit = 10, page = 1 } = filterUserDto;
    const offset = (page - 1 ) * limit;
    const where = {};
    
    if (firstName) where['firstName'] = firstName;
    if (lastName) where['lastName'] = lastName;
    if (age !== undefined) where['age'] = age;
    if (isThereATrouble !== undefined) where['isThereATrouble'] = isThereATrouble; 
    
    const result = await this.userRepository.find({ where, take: limit, skip: offset }); 
    return result;
  }
  
  async setTroublesToAll(){
    const result = await this.userRepository.update({}, {isThereATrouble: true});
        
    return {updatedUsers: result.affected};
  }

  async resolveAllTroubles(){
    const result = await this.userRepository.update({}, {isThereATrouble: false})

    return {updatedUsers: result.affected};
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne({ where: { id }}); 
    return result;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
