import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ProductServiceImpl } from './product.service';

describe('ProductService', () => {
  let service: ProductServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductServiceImpl],
    }).compile();

    service = module.get<ProductServiceImpl>(ProductServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
