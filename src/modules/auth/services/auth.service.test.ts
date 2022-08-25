import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import AuthServiceImpl from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceImpl],
    }).compile();

    service = module.get<AuthServiceImpl>(AuthServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
