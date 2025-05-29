import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { ICarFormData, IItem } from "@/types/interfaces";
import { useCreateCarMutation } from "@/store/api/car.api";
import { toast } from "sonner";
import { useIsAdmin } from "@/hooks/useUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetBrandsQuery, useGetModelsQuery } from "@/store/api/brand-model.api";
import { setModels } from "@/store/slices/carSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const CarCreateModal = () => {
  const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
  } = useForm<ICarFormData>();
  const selectedBrandId = watch("brandId");
  const isAdmin = useIsAdmin();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [createCar, { isLoading }] = useCreateCarMutation(); 
  const { data: brands = []} = useGetBrandsQuery(undefined, {
     skip: !open
  });
  const { data: models = [] } = useGetModelsQuery(selectedBrandId || '', {
    skip: !open 
  }) ;

  const handleModelSelect = (modelId: string) => {
    setValue("modelId", modelId);
    console.log(modelId)

    const selectedModel = models.find((m: IItem) => m.id === modelId);
    console.log(selectedModel?.brandId)
    if (selectedModel?.brandId) {
      setValue("brandId", selectedModel.brandId);
    }
};

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      dispatch(setModels([]));
      reset();
    }
  };
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
    <Dialog open={open} onOpenChange={handleDialogChange}>
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
            <Select value={watch("brandId") || ""}
              onValueChange={(value) => setValue("brandId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand: IItem) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brandId && (
              <p className="text-sm text-red-500 mt-1">{errors.brandId.message}</p>
            )}
          </div>
          <div>
            <Select onValueChange={handleModelSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {models?.map((model: IItem) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.modelId && (
              <p className="text-sm text-red-500 mt-1">{errors.modelId.message}</p>
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