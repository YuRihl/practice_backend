import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { CategoryServiceImpl } from '.';

describe('CategoryService', () => {
  let service: CategoryServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryServiceImpl],
    }).compile();

    service = module.get<CategoryServiceImpl>(CategoryServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
