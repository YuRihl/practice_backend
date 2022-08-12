import type { CreateProductDto } from '../dtos/create-product.dto';
import type { Product } from '../entities';

interface IProductService {
    findAllProducts(
        perPage: number,
        page: number,
        name: string): Promise<Product[]>;
    findOneProduct(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
}

export default IProductService;
