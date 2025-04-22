import CarsTable from "./components/CarsTable";
import { CarCreateModal } from "./components/CarCreateModal";

export default function CarsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Rental Cars</h3>
        <CarCreateModal />
      </div>
      <CarsTable />
    </div>
  );
}