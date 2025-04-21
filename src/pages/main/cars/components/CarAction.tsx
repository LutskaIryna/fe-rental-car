import { Button } from "@/components/ui/button";
import { useDeleteCarMutation } from "@/store/api/car.api";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

export const CarAction = (props: {id: string}) => {
  const [deleteCar] = useDeleteCarMutation();

  const  handleDelete = async (id: string) => {
    try {
      await deleteCar(id).unwrap(); // Unwrap the promise to handle success/error
      toast.success("Car deleted successfully!");
    } catch (error: any) {
      console.error("Failed to create car:", error);
      toast.error(error?.data?.message || "Failed to create car");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(props.id)}>
         Delete
        </DropdownMenuItem>
     </DropdownMenuContent>
    </DropdownMenu>
  )
}
