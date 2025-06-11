import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useGetCarColorListQuery } from "@/store/api/car.api";
import { useIsAdmin } from "@/hooks/useUser";
import { useGetBrandsQuery, useGetModelsQuery } from "@/store/api/brand-model.api";
import { IItem } from "@/types/interfaces";

type FilterFormValues = {
  year: number;
  color: string;
  brandId: string;
  modelId: string;
};

interface CarAdvancedFilterProps {
  setQueryParams: (params: Record<string, any>) => void;
}

export const CarAdvancedFilter = ({setQueryParams}: CarAdvancedFilterProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FilterFormValues>({
    defaultValues: {
      year: undefined,
      color: "",
      brandId: "",
      modelId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const { data: colorList = [] } = useGetCarColorListQuery();
  const isAdmin = useIsAdmin();
  const selectedBrandId = watch("brandId");
  const modelId = watch("modelId");
  const color = watch("color");

  const { data: brands = []} = useGetBrandsQuery(undefined, {
    skip: !open
  });
  const { data: models = [] } = useGetModelsQuery( '', {
    skip: !open 
  }) ;
    
  const handleModelSelect = (modelId: string) => {
    setValue("modelId", modelId);
    const selectedModel = models.find((m: IItem) => m.id === modelId);
    if (selectedModel?.brandId) {
      setValue("brandId", selectedModel.brandId);
    }
  };

  const onSubmit = (values: FilterFormValues) => {
    const queryParams = Object.entries(values).reduce((acc, [key, val]) => {
    if (val !== undefined && val !== "") {
      acc[key] = val;
    }
    return acc;
  }, {} as Record<string, any>);
    setQueryParams?.(queryParams);
    setOpen(false);
  };  

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {!isAdmin && <Button variant="default">Filter</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="year"
            type="number"
            placeholder="e.g. 2023"
            min="1990"
            max={new Date().getFullYear()}
            className="w-full"
            {...register("year")}
          />
        </div>
        <div>
          <Select value={color} onValueChange={(value) => setValue("color", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colorList.map((c: string) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={selectedBrandId || ""}
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
        </div>
        <div>
          <Select  value={modelId}  onValueChange={handleModelSelect}>
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
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  );
};
