import { ICar } from "@/types/interfaces";
import { useGetCarsQuery } from "@/store/api/car.api";
// import { useIsAdmin } from "@/hooks/useUser";
import { CarAction } from "./CarAction";

const columns = [  
  {
    name: "Brand",
  },
  {
    name: "Model",
  },
  {
    name: "Color",
  },
  {
    name: "Plate Number",
  },
  {
    name: "Year",
  },
  {
    name: "VIN",
  },
  {
    name: "Actions",
  },
];

const CarsTable = () => {
  
  // const isAdmin = useIsAdmin();
  const { data } = useGetCarsQuery();
  
  const cars: ICar[] = data || []; 

  return (    
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th key={column.name} className="px-4 py-2 text-left">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t">
                <td className="px-4 py-2">{car.brand}</td>
                <td className="px-4 py-2">{car.model}</td>
                <td className="px-4 py-2">{car.color}</td>
                <td className="px-4 py-2">{car.plateNumber}</td>
                <td className="px-4 py-2">{car.year}</td>
                <td className="px-4 py-2">{car.vin}</td>
                <td className="px-4 py-2">
                  <CarAction car={car} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default CarsTable;
