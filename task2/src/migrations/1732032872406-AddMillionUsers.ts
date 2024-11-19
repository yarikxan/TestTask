import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMillionUsers1732031350321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     const users = [];
    
    for (let i = 0; i < 1000000; i++) {
      users.push({
        firstName: `User${i + 1}`,
        lastName: `Last${i+1}`,
        age: Math.floor(Math.random() * 100),
        isThereATrouble: Math.random() > 0.5,
      });
      
      if (users.length === 1000) {
        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into("user")
          .values(users)
          .execute();
        users.length = 0;
      }
    }
    
    if (users.length > 0) {
      await queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("user")
        .values(users)
        .execute();
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      DELETE FROM user
      WHERE firstName LIKE 'User%'
    `);
    }

}
