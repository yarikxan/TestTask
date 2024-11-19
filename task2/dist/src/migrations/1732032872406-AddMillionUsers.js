"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMillionUsers1732031350321 = void 0;
class AddMillionUsers1732031350321 {
    async up(queryRunner) {
        const users = [];
        for (let i = 0; i < 1000000; i++) {
            users.push({
                firstName: `User${i + 1}`,
                lastName: `Last${i + 1}`,
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
    async down(queryRunner) {
        await queryRunner.query(`
      DELETE FROM user
      WHERE firstName LIKE 'User%'
    `);
    }
}
exports.AddMillionUsers1732031350321 = AddMillionUsers1732031350321;
//# sourceMappingURL=1732032872406-AddMillionUsers.js.map