import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import type { DeepPartial, FindOptionsSelect } from 'typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import type { CreateProductDto } from './dto/create-product.dto';
import { Category, ProductInfo } from './entities';
import { Product } from './entities';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  public async findAllProducts(
    category: string,
    perPage: number,
    page: number,
    name: string,
  ): Promise<Product[]> {
    const checkSkipIsNaN = (): number => {
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
        category: true,
        info: true,
      },
      where: {
        category: {
          name: category,
        },
        name: Like(`${name}%`),
      },
      order: {
        id: 'asc',
      },
      skip: checkSkipIsNaN(),
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
        category: true,
        info: true,
      },
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  public async findCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });

  }

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProductInfo = await this.createProductInfo(
      createProductDto.title,
      createProductDto.text,
    );

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
      info: newProductInfo,
      category,
      photo,
    } as DeepPartial<Product>);

    await this.productRepository.save(newProduct);
    return newProduct;
  }

  private async createProductInfo(title: string, text: string): Promise<ProductInfo> {
    const newProductInfo = await this.productInfoRepository.create({
      title,
      text,
    });

    await this.productInfoRepository.save(newProductInfo);
    return newProductInfo;
  }

}
