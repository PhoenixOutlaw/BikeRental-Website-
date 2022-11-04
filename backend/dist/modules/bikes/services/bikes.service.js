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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bike_entity_1 = require("../../../entity/bike.entity");
const reservation_entity_1 = require("../../../entity/reservation.entity");
const typeorm_2 = require("typeorm");
let BikesService = class BikesService {
    constructor(bikerepo, reservationrepo) {
        this.bikerepo = bikerepo;
        this.reservationrepo = reservationrepo;
    }
    async createnew(data) {
        const bike = this.bikerepo.create(data);
        try {
            const res = await this.bikerepo.save(bike);
            return res;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async getallbike(params, data) {
        try {
            const { from, to, page, limit } = params, filter = __rest(params, ["from", "to", "page", "limit"]);
            const pagination = {
                page: page !== null ? 1 : parseInt(page),
                limit: limit !== null ? 10 : parseInt(limit),
            };
            const offset = (pagination.page - 1) * pagination.limit;
            const reserved = await this.bikerepo
                .createQueryBuilder("bike")
                .leftJoinAndSelect("bike.reservations", "reservation")
                .where(Object.assign({}, filter))
                .andWhere(new typeorm_2.Brackets((qb) => {
                qb.orWhere("reservation.from BETWEEN :from and :to ", {
                    from: from,
                    to: to,
                })
                    .orWhere("reservation.to BETWEEN :from and :to", {
                    from: from,
                    to: to,
                })
                    .orWhere("reservation.from < :from and reservation.to >:to", {
                    from: from,
                    to: to,
                });
            }))
                .getMany();
            let query = this.bikerepo.createQueryBuilder("bike").where(Object.assign({}, filter));
            if (reserved.length) {
                query = query.andWhere("bike.id NOT IN (:reserved)", {
                    reserved: reserved.map((e) => e.id),
                });
            }
            const available = await query
                .offset(offset)
                .limit(pagination.limit)
                .getManyAndCount();
            return {
                total: 10,
                data: {
                    available: available,
                    unavailable: ["admin", "manager"].includes(data.jwt.role) ? reserved : [],
                },
            };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async getbike(id, role) {
        const relations = ["reviews"];
        if (["admin", "manager"].includes(role))
            relations.push("reservations");
        try {
            const res = await this.bikerepo.findOneOrFail({
                where: { id: id },
                relations: relations,
            });
            return res;
        }
        catch (err) {
            throw new common_1.HttpException("No Bike Found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(id) {
        try {
            const exist = await this.bikerepo.findBy({ id: id });
            if (!exist.length)
                throw new common_1.HttpException("id does not exist", common_1.HttpStatus.NOT_FOUND);
            const res = await this.bikerepo.delete({ id: id });
            return res;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async update(id, data) {
        try {
            const res = await this.bikerepo.findBy({ id: id });
            if (!res.length)
                throw new common_1.HttpException("id does not exist", common_1.HttpStatus.NOT_FOUND);
            await this.bikerepo
                .createQueryBuilder()
                .update()
                .set(Object.assign({}, data))
                .where({ id: id })
                .execute();
            return "updated";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
};
BikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bike_entity_1.Bike)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BikesService);
exports.BikesService = BikesService;
//# sourceMappingURL=bikes.service.js.map