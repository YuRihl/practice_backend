import type { Product, ProductCategory } from '../entities';

export class ProductDto {

  public id!: number;
  public name!: string;
  public price!: number;
  public availableCount!: number;
  public soldCount!: number;
  public description!: string;
  public content!: string;
  public categories!: ProductCategory[];

  public static fromEntity(product: Product): ProductDto {
    const productDto = new ProductDto();
    productDto.id = product.id;
    productDto.name = product.name;
    productDto.price = product.price;
    productDto.availableCount = product.availableCount;
    productDto.soldCount = product.soldCount;
    productDto.description = product.description;
    productDto.content = product.content;
    productDto.categories = product.categories;

    return productDto;
  }

  public static fromEntities(products: Product[]): ProductDto[] {
    const productDtos: ProductDto[] = [];

    products.forEach(product => productDtos.push(this.fromEntity(product)));
    return productDtos;
  }

}
