import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      return request.user.role.name === 'admin';
    }
    return false;
  }
}
