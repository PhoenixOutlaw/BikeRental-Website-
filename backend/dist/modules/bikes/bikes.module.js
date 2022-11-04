"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bike_entity_1 = require("../../entity/bike.entity");
const reservation_entity_1 = require("../../entity/reservation.entity");
const bikes_controller_1 = require("./controller/bikes.controller");
const bikes_service_1 = require("./services/bikes.service");
let BikesModule = class BikesModule {
};
BikesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bike_entity_1.Bike, reservation_entity_1.Reservation])],
        providers: [bikes_service_1.BikesService],
        controllers: [bikes_controller_1.BikesController]
    })
], BikesModule);
exports.BikesModule = BikesModule;
//# sourceMappingURL=bikes.module.js.map