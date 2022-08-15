import { Injectable } from '@nestjs/common';
import type { Product } from '../../products/entities';
import type { User } from '../../users/entities';
import type { InsertResult } from 'typeorm';
import { Repository } from 'typeorm';
import type { CartItem } from '../entities';

@Injectable()
export default class CartItemRepository extends Repository<CartItem> {

  public async addCartItem(user: User, product: Product): Promise<InsertResult> {
    const upsertResult = await this.upsert(
      {
        user,
        product,
      },
      { conflictPaths: ['product'] },
    );

    return upsertResult;
  }

}
