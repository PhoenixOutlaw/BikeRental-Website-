import { Bike } from "src/entity/bike.entity";

export async function avgrating(payload: any) {
  const bike = await Bike.createQueryBuilder("bike")
    .leftJoinAndSelect("bike.reviews", "reviews")
    .where("bike.id=:id", { id: payload.id })
    .getOne();
  const avgrating = bike.avgrating;
  const totalreviews = bike.reviews.length;
  let newavgrating: number;
  if (payload?.method === "add")
    newavgrating =
      (avgrating * totalreviews + payload?.newrating) / (totalreviews + 1);
  else if (payload?.method === "delete")
    newavgrating =
      (avgrating * totalreviews - payload?.newrating) / (totalreviews - 1);
  else
    newavgrating =
      (avgrating * totalreviews - payload?.oldrating + payload?.newrating) /
      totalreviews;
  if (isNaN(newavgrating)) newavgrating = 0;
  newavgrating = round(newavgrating, 1);
  await Bike.createQueryBuilder()
    .update()
    .set({ avgrating: newavgrating })
    .where("id = :id", { id: payload.id })
    .execute();
}

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
