"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const databaseconfig_module_1 = require("./database/databaseconfig.module");
const auth_module_1 = require("./modules/auth/auth.module");
const bikes_module_1 = require("./modules/bikes/bikes.module");
const reservation_module_1 = require("./modules/reservation/reservation.module");
const review_module_1 = require("./modules/review/review.module");
const user_module_1 = require("./modules/user/user.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            databaseconfig_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            bikes_module_1.BikesModule,
            review_module_1.ReviewModule,
            reservation_module_1.ReservationModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "uploads"),
            }),
        ],
        controllers: [
            app_controller_1.AppController,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map