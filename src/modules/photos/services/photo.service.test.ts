import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PhotoServiceImpl } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoServiceImpl],
    }).compile();

    service = module.get<PhotoServiceImpl>(PhotoServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
