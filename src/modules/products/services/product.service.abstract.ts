
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Product } from '../entities';

export abstract class ProductService {

  public abstract findAllProducts(
    categories: string[],
    name: string,
    page: number,
    perPage: number): Promise<Product[]>;
  public abstract findOneProduct(id: number): Promise<Product>;
  public abstract createOneProduct(createProductDto: CreateProductDto): Promise<Product>;
  public abstract updateOneProduct(id: number, updateOneProduct:
    UpdateProductDto): Promise<UpdateResponse>
  public abstract deleteOneProduct(id: number): Promise<void>

}
