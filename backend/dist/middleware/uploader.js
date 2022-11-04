"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imageupload = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
let Imageupload = class Imageupload {
    use(req, res, next) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'user_images');
            },
            filename: (req, file, cb) => {
                cb(null, new Date().toISOString() + file.originalname);
            }
        });
        const upload = multer({ dest: 'user_images' });
        console.log(upload);
        return upload;
        next();
    }
};
Imageupload = __decorate([
    (0, common_1.Injectable)()
], Imageupload);
exports.Imageupload = Imageupload;
//# sourceMappingURL=uploader.js.map