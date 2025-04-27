import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useIsAdmin } from "@/hooks/useUser";
import { useGetUserRentalQuery } from "@/store/api/rental.api";
import { selectActiveUserRental } from "@/store/selectors/rentalSelectors";
import { useSelector } from "react-redux";
import { RentalCreateModal } from "./components/RentalCreateModal";

export const RentalsPage = () => {
  const isAdmin = useIsAdmin();
  const { data } = useGetUserRentalQuery(undefined, {
      skip: isAdmin,
  });
  const activeRental = useSelector(selectActiveUserRental)
  
  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
          <CardTitle>Rental Information</CardTitle>
      </CardHeader>
      <CardContent>
          {activeRental ? (
            <div className="space-y-2">
              <p><strong>Car:</strong> {activeRental.car.model} ({activeRental.car.brand})</p>
              <p><strong>Start Date:</strong> {new Date(activeRental.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(activeRental.endDate).toLocaleDateString()}</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500">No active rental</p>
              <p className="text-gray-500">Would you like to rent a car?</p>
              {data && <RentalCreateModal />}
            </div>
          )}
        </CardContent>
      </Card>
  );
}