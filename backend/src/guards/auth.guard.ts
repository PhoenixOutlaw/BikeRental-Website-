import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import 'dotenv/config'
import * as jwt from "jsonwebtoken";

import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return false;
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.body = {
        data: { ...req.body },
        jwt: { id: data.id, role: data.role },
      };
      return true;
    } catch (err) {
      return false;
    }
  }
}

