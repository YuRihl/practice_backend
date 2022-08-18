import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { CartItemServiceImpl } from './cart-item.service';

describe('CartItemService', () => {
  let service: CartItemServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItemServiceImpl],
    }).compile();

    service = module.get<CartItemServiceImpl>(CartItemServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
