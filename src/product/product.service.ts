import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
  ) {}

  async findAllProducts(
    category: string,
    perPage: number,
    page: number,
    name: string,
  ) {
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
        name,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findOneProduct(id: number) {
    return await this.productRepository.findOne({
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
        id,
      },
    });
  }

  async findCategories() {
    const categories = await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }

  async create(createProductDto: CreateProductDto) {
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
    });

    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async createProductInfo(title: string, text: string) {
    const newProductInfo = await this.productInfoRepository.create({
      title,
      text,
    });

    await this.productInfoRepository.save(newProductInfo);
    return newProductInfo;
  }
}
