import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user.role.guard';

export function Auth(...roles: []) {
  console.log({ roles });
  return applyDecorators(
    // RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
