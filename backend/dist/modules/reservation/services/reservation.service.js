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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("../../../entity/reservation.entity");
const typeorm_2 = require("typeorm");
let ReservationService = class ReservationService {
    constructor(reservationrepo) {
        this.reservationrepo = reservationrepo;
    }
    async getreservation(id) {
        try {
            const res = await this.reservationrepo.find({
                where: { user: { id: id } },
                relations: ["bike"],
            });
            if (!res)
                throw new common_1.HttpException("no reservation found", common_1.HttpStatus.NOT_FOUND);
            return res;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async makereservation(id, data) {
        try {
            const reserved = await this.reservationrepo
                .createQueryBuilder("reservation")
                .where("reservation.bikeId = :id and ((reservation.from BETWEEN :from and :to  or reservation.to BETWEEN :from and :to) or (reservation.from <:from and reservation.to >:to))", { from: data.data.from, to: data.data.to, id: id })
                .getOne();
            if (reserved) {
                throw new common_1.HttpException("Bike Already reserved for the given reservation", common_1.HttpStatus.CONFLICT);
            }
            const new_reservation = this.reservationrepo.create(Object.assign(Object.assign({}, data.data), { bike: id, user: data.jwt.id }));
            const res = await this.reservationrepo.save(new_reservation);
            return res;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deletereservation(id) {
        try {
            const exist = await this.reservationrepo.findBy({ id: id });
            if (!exist.length)
                throw new common_1.HttpException("no reservation found", common_1.HttpStatus.NOT_FOUND);
            await this.reservationrepo.delete({ id: id });
            return "Reservation deleted";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async updatereservation(id, data) {
        try {
            const exist = await this.reservationrepo.findOne({
                where: { id: id },
                relations: ["user"],
            });
            if (data.jwt.id !== exist.user.id)
                throw new common_1.HttpException("Only the owner of the reservation can perform this action", common_1.HttpStatus.FORBIDDEN);
            if (!exist)
                throw new common_1.HttpException("no reservation found", common_1.HttpStatus.NOT_FOUND);
            await this.reservationrepo
                .createQueryBuilder()
                .update()
                .set({ active: data.data.active })
                .where({ id: id })
                .execute();
            return "Reservation Updated";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map