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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("../../../entity/reservation.entity");
const review_entity_1 = require("../../../entity/review.entity");
const ratingfnd_1 = require("../../../util/ratingfnd");
const typeorm_2 = require("typeorm");
let ReviewService = class ReviewService {
    constructor(reviewrepo, reservationrepo) {
        this.reviewrepo = reviewrepo;
        this.reservationrepo = reservationrepo;
    }
    async createreview(id, data) {
        try {
            const reservation = await this.reservationrepo
                .createQueryBuilder("reservation")
                .where("bikeId= :id and userId= :userId", {
                id: id,
                userId: data.jwt.id,
            })
                .getOne();
            if (!reservation) {
                throw new common_1.HttpException("You need to reserve this bike to review it", common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            if (!reservation.active) {
                throw new common_1.HttpException("You cant review canceled reservation", common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            const reviews = await this.reviewrepo
                .createQueryBuilder("review")
                .where("review.bikeId=:id and review.userId=:uid", {
                id: id,
                uid: data.jwt.id,
            })
                .getMany();
            if (reviews.length > 0)
                throw new common_1.HttpException("You have already reviewed the bike ", common_1.HttpStatus.CONFLICT);
            const new_review = this.reviewrepo.create(Object.assign({ bike: id, user: data.jwt.id }, data.data));
            (0, ratingfnd_1.avgrating)({ id: id, newrating: data.data.rating, method: "add" });
            await this.reviewrepo.save(new_review);
            return "review added successfully";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async deletereview(id) {
        try {
            const exist = await this.reviewrepo.findOne({
                where: { id: id },
                relations: ["bike"],
            });
            if (!exist)
                throw new common_1.HttpException("no review found", common_1.HttpStatus.NOT_FOUND);
            (0, ratingfnd_1.avgrating)({
                id: exist.bike.id,
                newrating: exist.bike.avgrating,
                method: "delete",
            });
            await this.reviewrepo.delete({ id: id });
            return "Review deleted";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
    async updatereview(id, data) {
        try {
            const exist = await this.reviewrepo.findOne({
                where: { id: id },
                relations: ["bike"],
            });
            if (!exist)
                throw new common_1.HttpException("no review found", common_1.HttpStatus.NOT_FOUND);
            await this.reviewrepo
                .createQueryBuilder()
                .update()
                .set(Object.assign({}, data.data))
                .where({ id: id })
                .execute();
            (0, ratingfnd_1.avgrating)({
                id: exist.bike.id,
                newrating: data.data.rating,
                oldrating: exist.bike.avgrating,
            });
            return "Review Updated";
        }
        catch (err) {
            throw new common_1.HttpException(err.message, err.status);
        }
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map