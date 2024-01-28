import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class ProductCategory {
  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product)
  product: Product;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Category)
  category: Category;
}
