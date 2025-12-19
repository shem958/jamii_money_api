import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Observable } from 'rxjs';
import { Request } from 'express';

interface JwtUser {
  role?: string | string[];
}

interface RequestWithUser extends Request {
  user?: JwtUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // user object is populated by the JwtStrategy's validate method
    const userRoles: string[] = Array.isArray(user?.role)
      ? user.role
      : user?.role
        ? [String(user.role)]
        : [];

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
