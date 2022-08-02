import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: keyof Express.User | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) return request.user?.[data];

    return request.user;
  },
);
