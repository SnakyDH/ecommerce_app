import { Product } from 'domain/products/model/product.model';
import { ProductEntity } from 'src/adapter/out/postgres/entities/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitialProducts1745773392072 implements MigrationInterface {
  private generateRandomImage(): string {
    return `https://via.placeholder.com/350?text=${Math.random()
      .toString(36)
      .substring(2, 15)}`;
  }

  private generateRandomPrice(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  private generateRandomStock(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
  private generateRandomName(): string {
    return `Producto ${Math.random().toString(36).substring(2, 15)}`;
  }

  private generateRandomProduct(): Omit<Product, 'id'> {
    return {
      name: this.generateRandomName(),
      price: this.generateRandomPrice(),
      stock: this.generateRandomStock(),
      image: this.generateRandomImage(),
    };
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    const products = Array.from({ length: 30 }, () =>
      this.generateRandomProduct(),
    );

    await queryRunner.manager.insert(ProductEntity, products);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // todo: delete all products because later i will add a migration to new products
    await queryRunner.query(`DELETE FROM products`);
  }
}
