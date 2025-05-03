import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CAR_FILTER_OPTIONS } from "@/constants/car-filter";
import { RentalStateOfCar } from "@/types/enums";

interface FilterCarProps {
  filter: RentalStateOfCar;
  setFilter: (value: RentalStateOfCar) => void;
  disabled?: boolean;
}

export const FilterCar = ({ filter, setFilter, disabled }: FilterCarProps) => {
  const filterOptions = CAR_FILTER_OPTIONS;

  return (
    <Select value={filter} onValueChange={(value) => setFilter(value as RentalStateOfCar)} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter cars" />
      </SelectTrigger>
      <SelectContent>
        {filterOptions?.map((option: {label: string; value: string;}) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
} 