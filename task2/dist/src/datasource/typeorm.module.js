"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
let TypeOrmModule = class TypeOrmModule {
};
exports.TypeOrmModule = TypeOrmModule;
exports.TypeOrmModule = TypeOrmModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [
            {
                provide: typeorm_1.DataSource,
                inject: [],
                useFactory: async () => {
                    try {
                        const dataSource = new typeorm_1.DataSource({
                            type: 'postgres',
                            host: 'localhost',
                            port: 5432,
                            username: 'postgres',
                            password: 'password',
                            database: 'postgres',
                            synchronize: true,
                            entities: [user_entity_1.User],
                        });
                        await dataSource.initialize();
                        console.log('Database connected successfully');
                        return dataSource;
                    }
                    catch (error) {
                        console.log('Error connecting to database');
                        throw error;
                    }
                },
            },
        ],
        exports: [typeorm_1.DataSource],
    })
], TypeOrmModule);
//# sourceMappingURL=typeorm.module.js.map