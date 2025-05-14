import { RentalStateOfCar } from "@/types/enums";

export const CAR_FILTER_OPTIONS: { label: string; value: RentalStateOfCar }[] = [
  { label: "All", value: RentalStateOfCar.ALL },
  { label: "Available", value: RentalStateOfCar.AVAILABLE },
  { label: "Rented", value: RentalStateOfCar.RENTED },
];
