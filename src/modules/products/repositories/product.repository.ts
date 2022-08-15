import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Like, Repository } from 'typeorm';
import type { CreateProductDto } from '../dtos/create-product.dto';
import type { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities';
import type { ProductWhere } from '../interfaces';

@Injectable()
export default class ProductRepository {

  constructor(@InjectRepository(Product) private readonly baseProductRepository: Repository<Product>) { }

  public async findAllBy(query: ProductWhere): Promise<Product[] | void> {
    try {
      const products = await this.baseProductRepository.find({
        select: {
          id: true,
          name: true,
          price: true,
          availableCount: true,
          soldCount: true,
          description: true,
          content: true,
        },
        relations: {
          categories: true,
        },
        where: {
          name: Like(`${query.name}%`),
          categories: ArrayContains(query.categories),
        },
        order: {
          id: 'asc',
        },
        skip: query.skip,
        take: query.take,
      });

      if (!products.length) throw new NotFoundException('Products weren\'t found');

      return products;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }

  }

  public async findOneById(id: number): Promise<Product | void> {
    try {
      const product = await this.baseProductRepository.findOne({
        select: {
          id: true,
          name: true,
          price: true,
          availableCount: true,
          soldCount: true,
          description: true,
          content: true,
        },
        relations: {
          categories: true,
        },
        where: {
          id,
        },
      });

      if (!product) throw new NotFoundException('Product with given ID was not found');

      return product;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }

  }

  public async createOne(createProductDto: CreateProductDto): Promise<Product | void> {
    try {
      const product = await this.baseProductRepository.create({
        name: createProductDto.name,
        price: createProductDto.price,
        availableCount: createProductDto.availableCount,
        soldCount: createProductDto.soldCount,
        description: createProductDto.description,
        content: createProductDto.content,
      });

      const newProduct = await this.baseProductRepository.save(product);

      return newProduct;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOne(id: number, updateProductDto: UpdateProductDto): Promise<{ message: string } | void> {
    try {
      await this.baseProductRepository.update(id, updateProductDto);

      return { message: 'The product was updated successfully' };
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteOne(id: number): Promise<{ message: string } | void> {
    try {
      await this.baseProductRepository.delete(id);

      return { message: 'The product was deleted successfully' };

    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

}
