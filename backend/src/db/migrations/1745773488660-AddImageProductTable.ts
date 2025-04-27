import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageProductTable1745773488660 implements MigrationInterface {
  name = 'AddImageProductTable1745773488660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "image" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
  }
}
