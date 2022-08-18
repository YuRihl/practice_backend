import type { UpdateResponse } from 'src/@types';
import type { CreateProductDto } from '../dtos/create-product.dto';
import type { UpdateProductDto } from '../dtos/update-product.dto';
import type { Product } from '../entities';

export default abstract class ProductService {

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
