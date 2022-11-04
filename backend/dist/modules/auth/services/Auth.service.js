"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt = require("jsonwebtoken");
const database_1 = require("../../../database");
const user_dto_1 = require("../../../dto/user.dto");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(user) {
        this.user = user;
    }
    async register(data) {
        const hashpassword = await bcrypt.hash(data.password, 10);
        const user = this.user.create(Object.assign(Object.assign({}, data), { email: data.email.toLowerCase(), role: data.role ? data.role : "regular", password: hashpassword }));
        try {
            const res = await this.user.save(user);
            const token = jwt.sign({ id: res.id, role: res.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACTIVE_DURATION });
            return { jwttoken: token, user: new user_dto_1.Serialized_user(res) };
        }
        catch (err) {
            throw new common_1.HttpException("Email already exsits", common_1.HttpStatus.CONFLICT);
        }
    }
    async signin(data) {
        try {
            const res = await this.user.findOneByOrFail({ email: data.email });
            if (!(await bcrypt.compare(data.password, res.password))) {
                throw new common_1.HttpException("Password incorrect", common_1.HttpStatus.FORBIDDEN);
            }
            const token = jwt.sign({ id: res.id, role: res.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACTIVE_DURATION });
            return { jwttoken: token, user: new user_dto_1.Serialized_user(res) };
        }
        catch (err) {
            throw new common_1.HttpException(err.response ? err.response : "Email does not exsits", err.status ? err.status : common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getloggeduser(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const res = await this.user.findOneByOrFail({ id: data.id });
            return new user_dto_1.Serialized_user(res);
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=Auth.service.js.map