import { ICar, IRental } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RentalState = {
  activeUserRental: IRental | null;
  avaliableCars: ICar[] | null;
  rentedCars: ICar[] | null;
};

const initialState: RentalState = {
  activeUserRental: null,
  avaliableCars: null,
  rentedCars: null,
};

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    setActiveUserRental: (state, action: PayloadAction<IRental | null>) => {
      state.activeUserRental = action.payload;
    },
    setAvaliableCars: (state, action: PayloadAction<ICar[]>) => {
      state.avaliableCars = action.payload;
    },
    setRentedCars: (state, action: PayloadAction<ICar[]>) => {
      state.rentedCars = action.payload;
    },
  },
});

export const { setActiveUserRental, setAvaliableCars, setRentedCars } = rentalSlice.actions;
export default rentalSlice.reducer;
