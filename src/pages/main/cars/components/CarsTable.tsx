import { ICar } from "@/types/interfaces";
import { useIsAdmin } from "@/hooks/useUser";
import { CarAction } from "./CarAction";
import { Skeleton } from "@/components/ui/skeleton";

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

interface CarsTableProps {
  cars: ICar[];
  isLoading: boolean;
}

export const CarsTable = ({ cars, isLoading }: CarsTableProps) => {
  const isAdmin = useIsAdmin();

  const rowsToShow: (ICar | undefined)[] = isLoading ? Array.from({ length: 5 }).map(() => undefined) : cars;

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
          {rowsToShow.map((car, index) => (
            <tr key={car?.id || index} className="border-t">
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-24" /> : car?.brand}
              </td>
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-24" /> : car?.model}
              </td>
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-20" /> : car?.color}
              </td>
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-28" /> : car?.plateNumber}
              </td>
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-16" /> : car?.year}
              </td>
              <td className="px-4 py-2">
                {isLoading ? <Skeleton className="h-4 w-32" /> : car?.vin}
              </td>
              <td className="px-4 py-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-8 rounded" />
                ) : (
                  isAdmin && <CarAction id={car?.id || ''} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
