import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
export declare class Imageupload implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): multer.Multer;
}
