import { Button } from "@/components/ui/button";
import { useDeleteCarMutation } from "@/store/api/car.api";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { CarActionType, UserRole } from "@/types/enums";
import { selectUserRole, selectUserId } from "@/store/selectors/authSelectors";
import { useSelector } from "react-redux";
import { usePermissions } from "@/hooks/useUser";
import { useState } from "react";
import { RentCarModal } from "./RentCarModal";

export const carActions = [
  { 
    label: "Delete", 
    action: CarActionType.DELETE,  
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]
  },
  { 
    label: "Rent", 
    action: CarActionType.RENT,  
    roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]
  },
]

export const CarAction = (props: {car: {id: string; brand: string; model: string; color: string}}) => {
  const [deleteCar] = useDeleteCarMutation();
  const userRole = useSelector(selectUserRole) || UserRole.USER;
  const userId = useSelector(selectUserId);
  const actions = usePermissions(carActions, userRole);

  const [isRentModalOpen, setRentModalOpen] = useState(false);

  const handleAction = (data: {id: string; action: CarActionType}) => {
    switch(data.action) {
      case CarActionType.DELETE:
        handleDelete(data.id);
        break;
      case CarActionType.RENT:
        setRentModalOpen(true);
        break;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id).unwrap();
      toast.success("Car deleted successfully!");
    } catch (error: any) {
      console.error("Failed to delete car:", error);
      toast.error(error?.data?.message || "Failed to delete car");
    }
  };
console.log({props});

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map(action => (
            <DropdownMenuItem
              key={action.action}
              className="cursor-pointer"
              onClick={() => handleAction({id: props.car.id, action: action.action})}>
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <RentCarModal 
        open={isRentModalOpen}
        onClose={() => setRentModalOpen(false)}
        carId={props.car.id}
        userId={userId}
        carInfo={props.car}
      />
    </>
  );
};













// import { Button } from "@/components/ui/button";
// import { useDeleteCarMutation } from "@/store/api/car.api";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { MoreVertical } from "lucide-react";
// import { toast } from "sonner";
// import { CarActionType, UserRole } from "@/types/enums";
// import { selectUserRole } from "@/store/selectors/authSelectors";
// import { useSelector } from "react-redux";
// import { usePermissions } from "@/hooks/useUser";
// import { useCreateRentalMutation } from "@/store/api/rentals.api";
// import { IRentalFormData } from "@/types/interfaces";


// export const carActions = [
//   { 
//     label: "Delete", 
//     action: CarActionType.DELETE,  
//     roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
//     // handler: async (id: string, deleteCar: any) => {
//     //   try {
//     //     await deleteCar(id).unwrap();
//     //     toast.success("Car deleted successfully!");
//     //   } catch (error: any) {
//     //     console.error("Failed to delete car:", error);
//     //     toast.error(error?.data?.message || "Failed to delete car");
//     //   }
//     // }
//   },
//   { 
//     label: "Rent", 
//     action: CarActionType.RENT,  
//     roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
//     // handler: async (id: string, deleteCar: any) => {
      
//     // }
//   },
// ]

// export const CarAction = (props: {id: string}) => {
//   const [deleteCar] = useDeleteCarMutation();
//   const [createRental] = useCreateRentalMutation(); 
//   const userRole = useSelector(selectUserRole) || UserRole.USER;
//   const actions = usePermissions(carActions, userRole);

//   const  handleAction = async (data: {id: string; action: CarActionType}) => {
//     switch(data.action) {
//       case CarActionType.DELETE: 
//         handleDelete(data.id);
//         break;
//       case CarActionType.RENT: 
//         handleRent(data.id);
//         break;
//     }
    
//   };

//   const  handleDelete = async (id: string) => {
//     try {
//       await deleteCar(id).unwrap(); // Unwrap the promise to handle success/error
//       toast.success("Car deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to create car:", error);
//       toast.error(error?.data?.message || "Failed to create car");
//     }
//   };

//   const handleRent = async (id: string) => {
//     // console.log({id});
//     // const data: IRentalFormData = {
//     //   userId: '',
//     //   carId: id,
//     //   startDate: '',
//     //   endDate: '',
//     //   IsActive: true
//     // }
//     // try {
//     //   await createRental(data).unwrap(); 
//     //   reset();
//     //   toast.success("Car created successfully!");

//     // } catch (error: any) {
//     //   console.error("Failed to create car:", error);
//     //   toast.error(error?.data?.message || "Failed to create car");
//     // }

//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <MoreVertical className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {actions.map(action => (
//           <DropdownMenuItem 
//             key={action.action}
//             className="cursor-pointer" 
//             onClick={() => handleAction({id: props.id, action: action.action})}>
//             {action.label}
//           </DropdownMenuItem>
//         ))}
//      </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
