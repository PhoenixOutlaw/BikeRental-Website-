"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bike_entity_1 = require("../entity/bike.entity");
const reservation_entity_1 = require("../entity/reservation.entity");
const review_entity_1 = require("../entity/review.entity");
const user_entity_1 = require("../entity/user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
const entities = [user_entity_1.User, bike_entity_1.Bike, review_entity_1.Review, reservation_entity_1.Reservation];
exports.default = entities;
//# sourceMappingURL=index.js.map