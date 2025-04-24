import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateRentalMutation } from "@/store/api/rentals.api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface RentCarModalProps {
  open: boolean;
  onClose: () => void;
  carId: string;
  userId: string;
  carInfo: { brand: string; model: string; color: string };
}

type RentalForm = {
  startDate: string;
  endDate: string;
};

export const RentCarModal = ({ open, onClose, carId, userId, carInfo }: RentCarModalProps) => {
  const [createRental] = useCreateRentalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RentalForm>({
    defaultValues: {
      startDate: '',
      endDate: '',
    }
  });

  const startDate = watch("startDate");

  const onSubmit = async (values: RentalForm) => {
    const data = {
      userId,
      carId,
      startDate: values.startDate,
      endDate: values.endDate,
      IsActive: true
    };

    try {
      await createRental(data).unwrap();
      toast.success("Car rented successfully!");
      reset();
      onClose();
    } catch (error: any) {
      console.error("Failed to rent car:", error);
      toast.error(error?.data?.message || "Failed to rent car");
    }
  };

  // текущая дата в формате yyyy-MM-dd
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to rent this car?</DialogTitle>
          <DialogDescription>
            You are renting a {carInfo.brand} {carInfo.model} ({carInfo.color}). Please select the rental dates.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                max={today}
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
  );
};
