import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'password',
    entities: [User],
    migrations: ['./src/migrations/**']
})
