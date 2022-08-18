import {
  BadRequestException, HttpException, Inject, Injectable,
  InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { ProductCategoryRepository, ProductRepository } from '../repositories';
import type { UpdateResponse } from 'src/@types';
import ProductService from './product.service.abstract';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Category } from '../../categories/entities';
import type { Product, ProductCategory } from '../entities';
import { IProductCategoryRepository, IProductRepository } from '../interfaces';
import CategoryService from '../../categories/services/category.service.abstract';

@Injectable()
export class ProductServiceImpl extends ProductService {

  constructor(
    @Inject(ProductRepository) private readonly productRepository: IProductRepository,
    @Inject(ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {
    super();
  }

  public async findAllProducts(
    categories: string[],
    name: string,
    page: number,
    perPage: number,
  ): Promise<Product[]> {
    try {
      if (page <= 0 || perPage < 0)
        throw new BadRequestException('Pagination values are negative, but they have to be positive');

      const skip = (page - 1) * perPage;
      const take = perPage;

      const products = await this.productRepository.findAllBy({ categories, name, skip, take });

      return products;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async findOneProduct(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneById(id);
      if (!product) throw new NotFoundException('Product with given ID was not found');

      return product;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createOneProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.createOne(createProductDto) as Product;

      if (createProductDto.categories) {
        createProductDto.categories.forEach(async (categoryName) => {
          const category = await this.categoryService.createOneCategory({ name: categoryName }) as Category;
          await this.productCategoryRepository.createOne(product, category) as ProductCategory;
        });
      }

      const newProduct = await this.productRepository.findOneById(product.id) as Product;

      return newProduct;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async updateOneProduct(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    try {
      const product = await this.productRepository.findOneById({ id });
      if (!product) throw new NotFoundException('Product to update was not found');

      return await this.productRepository.updateOne(product, updateProductDto);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async deleteOneProduct(id: number): Promise<void> {
    try {
      const product = await this.productRepository.findOneById({ id });
      if (!product) throw new NotFoundException('Product to delete was not found');

      await this.productRepository.deleteOne(product);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

}
