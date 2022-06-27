import { Photo } from 'src/photo/entities/photo.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category, ProductInfo } from './entities';
import { Product } from './entities';
export declare class ProductService {
    private productRepository;
    private productInfoRepository;
    private categoryRepository;
    private photoRepository;
    constructor(productRepository: Repository<Product>, productInfoRepository: Repository<ProductInfo>, categoryRepository: Repository<Category>, photoRepository: Repository<Photo>);
    findAllProducts(category: string, name: string): Promise<Product[]>;
    findOneProduct(id: number): Promise<Product>;
    findCategories(): Promise<Category[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    createProductInfo(title: string, text: string): Promise<ProductInfo>;
}
