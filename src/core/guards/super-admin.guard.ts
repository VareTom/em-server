import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor() {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isUserSuperAdmin = request.user.isSuperAdmin;
    if (!isUserSuperAdmin) throw new UnauthorizedException();
    return isUserSuperAdmin;
  }
}
