import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserWithoutWithRoleResponse => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return data ? user[data] : user;
  },
);
