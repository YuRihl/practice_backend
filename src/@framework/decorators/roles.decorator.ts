import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin'
}

export const ROLES_KEY = Symbol('ROLES');

export const Roles = (...roles: Role[]): CustomDecorator<symbol> => SetMetadata(ROLES_KEY, roles);
