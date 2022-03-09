import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor() {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    return request.user.isSuperAdmin;
  }
}
