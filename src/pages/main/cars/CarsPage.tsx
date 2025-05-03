import CarsTable from "./components/CarsTable";
import { CarCreateModal } from "./components/CarCreateModal";
import { FilterCar } from "./components/filterCar";
import { useGetCarsQuery, useGetAvailableCarsQuery, useGetRentedCarsQuery } from "@/store/api/car.api";
import { useEffect, useState } from "react";
import { RentalStateOfCar } from "@/types/enums";
import { useIsAdmin } from "@/hooks/useUser";

export default function CarsPage() {

  const isAdmin = useIsAdmin();
  const initialFilter = isAdmin ? RentalStateOfCar.ALL : RentalStateOfCar.AVAILABLE;
  const [filter, setFilter] = useState<RentalStateOfCar>(initialFilter);

  useEffect(() => {
    if (!isAdmin && filter !== RentalStateOfCar.AVAILABLE) {
      setFilter(RentalStateOfCar.AVAILABLE);
    }
  }, [filter, isAdmin]);
  
  const { data: allCars } = useGetCarsQuery(undefined, { skip: filter !== RentalStateOfCar.ALL ||  !isAdmin});
  const { data: availableCars } = useGetAvailableCarsQuery(undefined, { skip: filter !== RentalStateOfCar.AVAILABLE });
  const { data: rentedCars } = useGetRentedCarsQuery(undefined, { skip: filter !== RentalStateOfCar.RENTED || !isAdmin});

  const cars =  {
    [RentalStateOfCar.ALL]: allCars,
    [RentalStateOfCar.AVAILABLE]: availableCars,
    [RentalStateOfCar.RENTED]: rentedCars,
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Rental Cars</h3>
        <div className="flex items-center gap-4">
          <FilterCar filter={filter} setFilter={setFilter} disabled={!isAdmin}/>
          <CarCreateModal />
        </div>
      </div>
      <CarsTable cars={cars[filter] || []} />
    </div>
  )
}
