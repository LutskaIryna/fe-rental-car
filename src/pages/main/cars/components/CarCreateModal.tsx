import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { ICarFormData } from "@/types/interfaces";
import { useCreateCarMutation } from "@/store/api/car.api";
import { toast } from "sonner";
import { useIsAdmin } from "@/hooks/useUser";

export const CarCreateModal = () => {
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
  } = useForm<ICarFormData>();

  const [createCar, { isLoading }] = useCreateCarMutation(); 
  const isAdmin = useIsAdmin();
  const onSubmit = async (data: ICarFormData) => {
    try {
      await createCar(data).unwrap(); 
      reset();
      toast.success("Car created successfully!");

    } catch (error: any) {
      console.error("Failed to create car:", error);
      toast.error(error?.data?.message || "Failed to create car");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isAdmin && <Button variant="default">Add Car</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Car</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Brand"
              {...register("brand", { required: "Brand is required" })}
            />
            {errors.brand && (
              <p className="text-sm text-red-500 mt-1">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Model"
              {...register("model", { required: "Model is required" })}
            />
            {errors.model && (
              <p className="text-sm text-red-500 mt-1">{errors.model.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Color"
              {...register("color", { required: "Color is required" })}
            />
            {errors.color && (
              <p className="text-sm text-red-500 mt-1">{errors.color.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Plate Number"
              {...register("plateNumber", { required: "Plate Number is required" })}
            />
            {errors.plateNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.plateNumber.message}</p>
            )}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Year"
              {...register("year", { required: "Year is required" })}
            />
            {errors.year && (
              <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="VIN"
              {...register("vin", { required: "VIN is required" })}
            />
            {errors.vin && (
              <p className="text-sm text-red-500 mt-1">{errors.vin.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Car"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}