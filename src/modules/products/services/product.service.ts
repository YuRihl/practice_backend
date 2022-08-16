import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { DeleteResponse, UpdateResponse } from 'src/@types';
import type { Category } from 'src/modules/categories/entities';
import CategoryRepository from 'src/modules/categories/repositories/category.repository';
import type { CreateProductDto } from '../dtos/create-product.dto';
import type { UpdateProductDto } from '../dtos/update-product.dto';
import type { Product, ProductCategory } from '../entities';
import ProductCategoryRepository from '../repositories/product-category.repository';
import ProductRepository from '../repositories/product.repository';
import type IProductService from './product.service.abstract';

@Injectable()
export class ProductService implements IProductService {

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly categoryRepository: CategoryRepository,
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
      const product = await this.productRepository.createOne(createProductDto) as Product;

      if (createProductDto.categories) {
        createProductDto.categories.forEach(async (categoryName) => {
          const category = await this.categoryRepository.createOne({ name: categoryName }) as Category;
          await this.productCategoryRepository.createOne(product, category) as ProductCategory;
        });
      }

      const newProduct = await this.productRepository.findOneById(product.id);

      return newProduct;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOneProduct(id: number, updateProductDto: UpdateProductDto)
    : Promise<UpdateResponse | void> {
    return this.productRepository.updateOne(id, updateProductDto);
  }

  public async deleteOneProduct(id: number): Promise<DeleteResponse | void> {
    return this.productRepository.deleteOne(id);
  }

}
