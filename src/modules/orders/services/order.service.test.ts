import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { OrderServiceImpl } from './order.service';

describe('OrdersService', () => {
  let service: OrderServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderServiceImpl],
    }).compile();

    service = module.get<OrderServiceImpl>(OrderServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
