"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        console.log(createUserDto);
        const result = await this.userRepository.create(createUserDto);
        return this.userRepository.save(result);
    }
    async findAll(filterUserDto) {
        const { firstName, lastName, age, isThereATrouble, limit = 10, page = 1 } = filterUserDto;
        const offset = (page - 1) * limit;
        const where = {};
        if (firstName)
            where['firstName'] = firstName;
        if (lastName)
            where['lastName'] = lastName;
        if (age !== undefined)
            where['age'] = age;
        if (isThereATrouble !== undefined)
            where['isThereATrouble'] = isThereATrouble;
        const result = await this.userRepository.find({ where, take: limit, skip: offset });
        return result;
    }
    async setTroublesToAll() {
        const result = await this.userRepository.update({}, { isThereATrouble: true });
        return { updatedUsers: result.affected };
    }
    async resolveAllTroubles() {
        const result = await this.userRepository.update({}, { isThereATrouble: false });
        return { updatedUsers: result.affected };
    }
    async findOne(id) {
        const result = await this.userRepository.findOne({ where: { id } });
        return result;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map