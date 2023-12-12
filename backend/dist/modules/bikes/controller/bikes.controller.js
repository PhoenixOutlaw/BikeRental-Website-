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
exports.BikesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("src/guards/auth.guard");
const role_guard_1 = require("src/guards/role.guard");
const bikes_service_1 = require("../services/bikes.service");
let BikesController = class BikesController {
    constructor(service) {
        this.service = service;
    }
    getallbikes(params, data) {
        return this.service.getallbike(params, data);
    }
    getbike(id, data) {
        return this.service.getbike(id, data.jwt.role);
    }
    create(data) {
        return this.service.createnew(data.data);
    }
    update(id, data) {
        return this.service.update(id, data.data);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BikesController.prototype, "getallbikes", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BikesController.prototype, "getbike", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, role_guard_1.Roles)(["admin"]),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BikesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    (0, common_1.HttpCode)(200),
    (0, role_guard_1.Roles)(["admin"]),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BikesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.HttpCode)(200),
    (0, role_guard_1.Roles)(["admin"]),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BikesController.prototype, "delete", null);
BikesController = __decorate([
    (0, common_1.Controller)("bike"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [bikes_service_1.BikesService])
], BikesController);
exports.BikesController = BikesController;
//# sourceMappingURL=bikes.controller.js.map