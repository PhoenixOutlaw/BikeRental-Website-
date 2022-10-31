import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import path from 'path';

@Injectable()
export class Imageupload implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
          cb(null,'user_images')
        },
        filename:(req,file,cb)=>{
          cb(null,new Date().toISOString()+file.originalname)
        }
      })
      const upload = multer({dest:'user_images'})
      console.log(upload)
      return upload
        next();
      }
}