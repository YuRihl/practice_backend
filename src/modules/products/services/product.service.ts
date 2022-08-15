import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { CreateProductDto } from '../dtos/create-product.dto';
import type { UpdateProductDto } from '../dtos/update-product.dto';
import type { Product } from '../entities';
import ProductRepository from '../repositories/product.repository';
import type IProductService from './product.service.abstract';

@Injectable()
export class ProductService implements IProductService {

  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  public async findAllProducts(
    categories: string[],
    name: string,
    page: number,
    perPage: number,
  ): Promise<Product[] | void> {
    try {
      if (page <= 0 || perPage < 0)
        throw new BadRequestException('Pagination values are negative, but they have to be positive');

      const skip = (page - 1) * perPage;
      const take = perPage;

      const products = this.productRepository.findAllBy({ categories, name, skip, take });

      return products;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneProduct(id: number): Promise<Product | void> {
    try {
      const product = this.productRepository.findOneById(id);

      return product;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async createOneProduct(createProductDto: CreateProductDto): Promise<Product | void> {
    try {
      const newProduct = this.productRepository.createOne(createProductDto);

      return newProduct;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOneProduct(id: number, updateProductDto: UpdateProductDto): Promise<{ message: string } | void> {
    return this.productRepository.updateOne(id, updateProductDto);
  }

  public async deleteOneProduct(id: number): Promise<{ message: string } | void> {
    return this.productRepository.deleteOne(id);
  }

}
