"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/entities/user.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'password',
    entities: [user_entity_1.User],
    migrations: ['./src/migrations/**']
});
//# sourceMappingURL=typeOrm.config.js.map