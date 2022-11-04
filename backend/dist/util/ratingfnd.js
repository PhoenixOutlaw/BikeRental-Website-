"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avgrating = void 0;
const bike_entity_1 = require("../entity/bike.entity");
async function avgrating(payload) {
    const bike = await bike_entity_1.Bike.createQueryBuilder("bike")
        .leftJoinAndSelect("bike.reviews", "reviews")
        .where("bike.id=:id", { id: payload.id })
        .getOne();
    const avgrating = bike.avgrating;
    const totalreviews = bike.reviews.length;
    let newavgrating;
    if ((payload === null || payload === void 0 ? void 0 : payload.method) === "add")
        newavgrating =
            (avgrating * totalreviews + (payload === null || payload === void 0 ? void 0 : payload.newrating)) / (totalreviews + 1);
    else if ((payload === null || payload === void 0 ? void 0 : payload.method) === "delete")
        newavgrating =
            (avgrating * totalreviews - (payload === null || payload === void 0 ? void 0 : payload.newrating)) / (totalreviews - 1);
    else
        newavgrating =
            (avgrating * totalreviews - (payload === null || payload === void 0 ? void 0 : payload.oldrating) + (payload === null || payload === void 0 ? void 0 : payload.newrating)) /
                totalreviews;
    if (isNaN(newavgrating))
        newavgrating = 0;
    newavgrating = round(newavgrating, 1);
    await bike_entity_1.Bike.createQueryBuilder()
        .update()
        .set({ avgrating: newavgrating })
        .where("id = :id", { id: payload.id })
        .execute();
}
exports.avgrating = avgrating;
function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
//# sourceMappingURL=ratingfnd.js.map