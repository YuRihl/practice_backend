import {
  BadRequestException, Inject, Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { FindOptionsRelations } from 'typeorm';
import { In, Like } from 'typeorm';
import { CategoryService } from '../../categories/services';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Product, ProductCategory } from '../entities';
import { IProductCategoryRepository, IProductRepository } from '../interfaces';
import { ProductCategoryRepository, ProductRepository } from '../repositories';
import { ProductService } from './product.service.abstract';

@Injectable()
export class ProductServiceImpl extends ProductService {

  private _relationOptions: FindOptionsRelations<Product> = {
    categories: {
      category: true,
    },
  };

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
    if (page <= 0 || perPage < 0)
      throw new BadRequestException('Pagination values are negative, but they have to be positive');

    const skip = (page - 1) * perPage;
    const take = perPage;

    return await this.productRepository.find({
      relations: this._relationOptions,
      where: {
        name: Like(`${name}%`),
        categories: {
          category: {
            name: categories.includes('All Category') ? undefined : In(categories),
          },
        },
      },
      order: {
        id: 'asc',
      },
      skip,
      take,
    });
  }

  public async findOneProduct(id: number): Promise<Product> {

    const product = await this.productRepository.findOne({
      relations: this._relationOptions,
      where: { id },
    });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);

    return product;
  }

  public async createOneProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createOne(createProductDto);

    const categoryNames = createProductDto.categories;

    if (categoryNames && categoryNames.length > 0) {
      const newProductCategories: ProductCategory[] = [];

      for (const name of categoryNames) {
        const category = await this.categoryService.createOneCategory({ name });
        newProductCategories.push(await this.productCategoryRepository.createOne(product, category));
      }

      product.categories = newProductCategories;
      return await this.findOneProduct(product.id);
    }

    return product;
  }

  public async updateOneProduct(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    const product = await this.findOneProduct(id);

    const categoryNames = updateProductDto.categories;

    if (categoryNames && categoryNames.length > 0) {
      await this.productCategoryRepository.remove(product.categories);

      const newProductCategories: ProductCategory[] = [];

      for (const name of categoryNames) {
        const category = await this.categoryService.createOneCategory({ name });
        newProductCategories.push(await this.productCategoryRepository.createOne(product, category));
      }

      product.categories = newProductCategories;
    }

    return await this.productRepository.updateOne(product, updateProductDto);
  }

  public async deleteOneProduct(id: number): Promise<void> {
    const product = await this.findOneProduct(id);

    await this.productRepository.remove(product);
  }

}
