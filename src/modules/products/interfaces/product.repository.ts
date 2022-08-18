import type { UpdateResponse } from 'src/@types';
import type { Repository } from 'typeorm';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Product } from '../entities';
import type { ProductWhere } from './product-where.interface';

interface CustomRepository {
  findAllBy(query: ProductWhere): Promise<Product[]>;
  findOneById(id: number): Promise<Product | null>;
  createOne(createProductDto: CreateProductDto): Promise<Product>;
  updateOne(product: Product, updateProductDto: UpdateProductDto): Promise<UpdateResponse>;
  deleteOne(product: Product): Promise<void>;
}

type IProductRepository = CustomRepository & Repository<Product>;

export type { IProductRepository };
