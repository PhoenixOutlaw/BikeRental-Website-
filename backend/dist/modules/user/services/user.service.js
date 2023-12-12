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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs = require("fs");
const database_1 = require("../../../database");
const user_dto_1 = require("../../../dto/user.dto");
const multerconfig_1 = require("../../../multerconfig/multerconfig");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userrepo) {
        this.userrepo = userrepo;
    }
    async getallusers(params) {
        try {
            const pagination = {
                page: params.page !== null ? 1 : parseInt(params.page),
                limit: params.limit !== null ? 10 : parseInt(params.limit),
            };
            const offset = (pagination.page - 1) * pagination.limit;
            const total = await this.userrepo.createQueryBuilder().getCount();
            let query = this.userrepo.createQueryBuilder();
            if (params.search)
                query = query.andWhere("email like :email", {
                    email: `%${params.search}%`,
                });
            const users = await query
                .offset(offset)
                .limit(pagination.limit)
                .getMany();
            return {
                total: total,
                users: users.map((user) => new user_dto_1.Serialized_user(user)),
            };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NO_CONTENT);
        }
    }
    async getuser(id, data) {
        try {
            if (data.jwt.role === "regular" && id !== data.jwt.id) {
                throw new common_1.HttpException("FORBIDDEN", common_1.HttpStatus.FORBIDDEN);
            }
            const user = await this.userrepo.findOne({
                where: { id: id },
                relations: ["reservations.bike"],
            });
            if (user === null)
                throw new common_1.HttpException("No user found", common_1.HttpStatus.NOT_FOUND);
            return new user_dto_1.Serialized_user(user);
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async deleteuser(id) {
        try {
            const user = await this.userrepo.findOneBy({ id: id });
            if (!user)
                throw new common_1.HttpException("No user found", common_1.HttpStatus.NOT_FOUND);
            await this.userrepo.delete({ id: id });
            return "User Deleted";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async updateuser(id, data) {
        if (["regular", "manager"].includes(data.jwt.role) && id !== data.jwt.id) {
            throw new common_1.HttpException("FORBIDDEN", common_1.HttpStatus.FORBIDDEN);
        }
        if (["regular", "manager"].includes(data.jwt.role) && data.data.role) {
            delete data.data.role;
        }
        if (data.data.email)
            data.data.email = data.data.email.toLowerCase();
        try {
            const res = await this.userrepo.findOneBy({ id: id });
            if (!res)
                throw new common_1.HttpException("id does not exist", common_1.HttpStatus.NOT_FOUND);
            if (data.data.email && res.email !== data.data.email) {
                const res = await this.userrepo.findOneBy({ email: data.data.email });
                if (res)
                    throw new common_1.HttpException("Email Already Exists", common_1.HttpStatus.CONFLICT);
            }
            if (data.data.image && res.image) {
                fs.unlink(`${multerconfig_1.multerConfig.dest}/${res.image}`, () => null);
            }
            await this.userrepo
                .createQueryBuilder()
                .update()
                .set(Object.assign({}, data.data))
                .where({ id: id })
                .execute();
            return "updated";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map