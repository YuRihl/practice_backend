import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAllProducts(category: string, name: string): Promise<Product[]>;
    findCategories(): Promise<import("./entities").Category[]>;
    findOneProduct(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
}
