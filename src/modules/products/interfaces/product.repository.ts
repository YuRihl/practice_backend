import type { Repository } from 'typeorm';
import type { UpdateResponse } from '../../../@types';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Product } from '../entities';

interface CustomRepository {
  createOne(createProductDto: CreateProductDto): Promise<Product>;
  updateOne(product: Product, updateProductDto: UpdateProductDto): Promise<UpdateResponse>;
}

type IProductRepository = CustomRepository & Repository<Product>;

export type { IProductRepository };
