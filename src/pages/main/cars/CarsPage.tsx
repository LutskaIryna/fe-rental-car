import { CarsTable }from "./components/CarsTable";
import { CarCreateModal } from "./components/CarCreateModal";
import { FilterCar } from "./components/filterCar";
import { useGetCarsQuery } from "@/store/api/car.api";
import { useState } from "react";
import { RentalStateOfCar } from "@/types/enums";
import { useIsAdmin } from "@/hooks/useUser";
import { CarAdvancedFilter } from "./components/CarAdvancedFilter";

export default function CarsPage() {

  const isAdmin = useIsAdmin();
  const initialFilter = isAdmin ? RentalStateOfCar.ALL : RentalStateOfCar.AVAILABLE;
  const [filter, setFilter] = useState<RentalStateOfCar>(initialFilter);
  const [queryParams, setQueryParams] = useState<{
    brand?: string;
    vin?: string;
    model?: string;
    color?: string;
    year?: number;
  }>({});

  const { data: cars = [], isLoading } = useGetCarsQuery(
    { filter, ...queryParams },
    { skip: !filter || (!isAdmin && filter !== RentalStateOfCar.AVAILABLE) }
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Rental Cars</h3>
        <div className="flex items-center gap-4">
          <CarAdvancedFilter setQueryParams={setQueryParams}/>     
          <FilterCar filter={filter} setFilter={setFilter} disabled={!isAdmin}/>
          <CarCreateModal />
        </div>
      </div>
      <CarsTable cars={cars} isLoading={isLoading} />
    </div>
  )
}
