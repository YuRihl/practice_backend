
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Category } from '../../categories/entities';
import type { MockType } from '../../../@types';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { IProductCategoryRepository, IProductRepository } from '../interfaces';
import { ProductService } from './product.service.abstract';
import type { ProductCategory } from '../entities';
import type { Product } from '../entities';
import type { Provider } from '@nestjs/common';
import { ProductServiceImpl } from './product.service';
import { ProductCategoryRepository, ProductRepository } from '../repositories';
import { CategoryService, CategoryServiceImpl } from '../../categories/services';
import { CategoryRepository } from '../../categories/repositories';
import type { ICategoryRepository } from '../../categories/interfaces';
import type { CreateCategoryDto, UpdateCategoryDto } from '../../categories/dtos';
import { BadRequestException } from '@nestjs/common/exceptions';

export const mockProductRepositoryFactory: () => MockType<IProductRepository> =
  jest.fn(() => ({
    find: jest.fn(() => Promise<Product[]>),
    createOne: jest.fn((_dto: CreateProductDto) => Promise<Product>),
    updateOne: jest.fn((_product: Product, _dto: UpdateProductDto) => Promise<UpdateResponse>),
  }));

export const mockProductCategoryRepositoryFactory: () => MockType<IProductCategoryRepository> =
  jest.fn(() => ({
    createOne: jest.fn((_product: Product, _category: Category) => Promise<ProductCategory>),
  }));

export const mockCategoryRepository: () => MockType<ICategoryRepository> =
  jest.fn(() => ({
    createOne: jest.fn((_dto: CreateCategoryDto) => Promise<Category>),
    updateOne: jest.fn((_category: Category, _dto: UpdateCategoryDto) => Promise<UpdateResponse>),
  }));

// export class MockProductServiceImpl extends ProductService {

//   public findAllProducts = (_categories: string[], _name: string, _page: number, _perPage: number)
//     : Promise<Product[]> => Promise.resolve(Array<Product>(new Product(), new Product()));
//   public findOneProduct = (_id: number): Promise<Product> => Promise.resolve(new Product());
//   public createOneProduct = (_dto: CreateProductDto): Promise<Product> => Promise.resolve(new Product());
//   public updateOneProduct = (_id: number, _dto: UpdateProductDto): Promise<UpdateResponse> =>
//     Promise.resolve({ message: 'Product was updated successfully', id: 1, updatedAt: new Date().toISOString() });
//   public deleteOneProduct = (_id: number): Promise<void> => Promise.resolve();

// }

export const mockProductRepository = {
  createOne: jest.fn((_product: Product, _category: Category) => Promise<ProductCategory>),
};

describe('ProductService', () => {
  let productService: ProductService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //let categoryService: CategoryService;

  beforeEach(async () => {
    const productServiceImpl: Provider = {
      provide: ProductService,
      useClass: ProductServiceImpl,
    };
    const categoryServiceImpl: Provider = {
      provide: CategoryService,
      useClass: CategoryServiceImpl,
    };
    const productRepository: Provider = {
      provide: ProductRepository,
      useFactory: mockProductRepositoryFactory,
    };
    const productCategoryRepository: Provider = {
      provide: ProductCategoryRepository,
      useFactory: mockProductCategoryRepositoryFactory,
    };
    const categoryRepository: Provider = {
      provide: CategoryRepository,
      useFactory: mockCategoryRepository,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [productServiceImpl, categoryServiceImpl,
        productRepository, productCategoryRepository, categoryRepository],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    //categoryService = module.get<CategoryServiceImpl>(CategoryServiceImpl);
  });

  describe('findAllProducts', () => {
    it('returns list of products without filtering', async () => {
      const findAllProducts = jest.spyOn(productService, 'findAllProducts');
      const findAllProductsOptions: [string[], string, number, number] = [['All Category'], '', 1, 0];

      const result = await productService.findAllProducts(...findAllProductsOptions);
      expect(findAllProducts).toHaveBeenCalledWith(...findAllProductsOptions);
      expect(result).toBe(Promise<Product[]>);
    });

    it('does not return any product because of invalid pagination', async () => {
      const error = new BadRequestException('Pagination values are invalid');
      jest.spyOn(productService, 'findAllProducts')
        .mockRejectedValue(error);
      const findAllProductsOptions: [string[], string, number, number] = [['All Category'], '', -5, 0];

      const result = await productService.findAllProducts(...findAllProductsOptions);
      expect(result).toThrowError(error);
    });
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
