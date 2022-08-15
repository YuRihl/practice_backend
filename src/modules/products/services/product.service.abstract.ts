import type { CreateProductDto } from '../dtos/create-product.dto';
import type { UpdateProductDto } from '../dtos/update-product.dto';
import type { Product } from '../entities';

export default abstract class IProductService {

  public abstract findAllProducts(
    categories: string[],
    name: string,
    page: number,
    perPage: number): Promise<Product[] | void>;
  public abstract findOneProduct(id: number): Promise<Product | void>;
  public abstract createOneProduct(createProductDto: CreateProductDto): Promise<Product | void>;
  public abstract updateOneProduct(id: number, updateOneProduct: UpdateProductDto): Promise<{ message: string } | void>
  public abstract deleteOneProduct(id: number): Promise<{ message: string } | void>

}
