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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("src/guards/auth.guard");
const reservation_service_1 = require("../services/reservation.service");
let ReservationController = class ReservationController {
    constructor(service) {
        this.service = service;
    }
    getresrvation(id) {
        return this.service.getreservation(id);
    }
    makeresrvation(data, id) {
        return this.service.makereservation(id, data);
    }
    deleteresrvation(id) {
        return this.service.deletereservation(id);
    }
    updateresrvation(id, data) {
        return this.service.updatereservation(id, data);
    }
};
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getresrvation", null);
__decorate([
    (0, common_1.Post)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "makeresrvation", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "deleteresrvation", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "updateresrvation", null);
ReservationController = __decorate([
    (0, common_1.Controller)("reservation"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map