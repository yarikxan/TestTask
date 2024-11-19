import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
