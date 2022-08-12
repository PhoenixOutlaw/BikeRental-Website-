import { Injectable, CanActivate, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const req = context.switchToHttp().getRequest();
    if (!roles) {
      return true;
    }
    return roles.toString() === req.body.jwt.role;
  }
}

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
