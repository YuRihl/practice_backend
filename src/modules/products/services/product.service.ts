import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../../photos/entities';
import type { DeepPartial, FindOptionsSelect } from 'typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import type { CreateProductDto } from '../dtos/create-product.dto';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../entities';
import type IProductService from './product.service.abstract';

@Injectable()
export class ProductService implements IProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  public async findAllProducts(
    perPage: number,
    page: number,
    name: string,
  ): Promise<Product[]> {
    const checkSkip = (): number => {
      if (page <= 0 || perPage < 0)
        throw new BadRequestException('Pagination values are negative, but they have to be positive');

      return (page - 1) * perPage;
    };

    return await this.productRepository.find({
      select: {
        id: true,
        name: true,
        price: true,
        soldCount: true,
        description: true,
      },
      relations: {
        categories: true,
      },
      where: {
        name: Like(`${name}%`),
      },
      order: {
        id: 'asc',
      },
      skip: checkSkip(),
      take: perPage,
    });
  }

  public async findOneProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      select: {
        id: true,
        name: true,
        price: true,
        soldCount: true,
        description: true,
      } as FindOptionsSelect<Product>,
      relations: {
        categories: true,
      },
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    const photo = await this.photoRepository.findOneBy({
      id: createProductDto.photoId,
    });

    const newProduct = await this.productRepository.create({
      name: createProductDto.name,
      price: createProductDto.price,
      soldCount: createProductDto.soldCount,
      description: createProductDto.description,
      category,
      photo,
    } as DeepPartial<Product>);

    await this.productRepository.save(newProduct);
    return newProduct;
  }

}
