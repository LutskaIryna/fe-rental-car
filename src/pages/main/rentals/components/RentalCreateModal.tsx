import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useIsUser } from "@/hooks/useUser";
import { useCreateRentalMutation } from "@/store/api/rental.api";
import { selectUserId } from "@/store/selectors/authSelectors";
import { ICar, IRentalFormData } from "@/types/interfaces";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetCarsQuery } from "@/store/api/car.api";
import { RentalStateOfCar } from "@/types/enums";

export const RentalCreateModal = () => {
  const isUser = useIsUser();
  const { data: cars } = useGetCarsQuery({filter: RentalStateOfCar.AVAILABLE}, {
      skip: !isUser,
    });
  const [createRental] = useCreateRentalMutation();
  const userId = useSelector(selectUserId);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<IRentalFormData>({
    defaultValues: {
      userId,
      carId: '',
      isActive: true,
      startDate: '',
      endDate: '',
    }
  });
  
  const startDate = watch("startDate");

  const onSubmit = async (values: IRentalFormData) => {
    const data = {
      userId: values.userId,
      carId: values.carId,
      startDate: values.startDate,
      endDate: values.endDate,
      isActive: values.isActive
    };

    try {
      await createRental(data).unwrap();
      toast.success("Car rented successfully!");
      reset();
    } catch (error: any) {
      console.error("Failed to rent car:", error);
      toast.error(error?.data?.message || "Failed to rent car");
    }
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        {isUser && <Button variant="default" className="mt-4">Rent Car</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rent Car</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Select
              onValueChange={(value) => setValue("carId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a car" />
              </SelectTrigger>
              <SelectContent>
                {cars?.map((car: ICar) => (
                  <SelectItem key={car.id} value={car.id}>
                    {car.brand.name} {car.model.name} ({car.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.carId && (
              <p className="text-sm text-red-500">{errors.carId.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                  validate: (value) => {
                    if (new Date(value) > new Date(today)) {
                      return "Start date cannot be in the future";
                    }
                    return true;
                  }
                })}
                min={today}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="flex-1">
              <Input
                type="date"
                {...register("endDate", {
                  required: "End date is required",
                  validate: (value) => {
                    if (!startDate) return true;
                    if (new Date(value) < new Date(startDate)) {
                      return "End date must be after start date";
                    }
                    return true;
                  }
                })}
                min={startDate || undefined}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
      </Dialog>
  )
}