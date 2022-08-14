import type { CreateProductDto } from '../dtos/create-product.dto';
import type { Product } from '../entities';

export default abstract class IProductService {

  public abstract findAllProducts(
    perPage: number,
    page: number,
    name: string): Promise<Product[]>;
  public abstract findOneProduct(id: number): Promise<Product>;
  public abstract create(createProductDto: CreateProductDto): Promise<Product>;

}
