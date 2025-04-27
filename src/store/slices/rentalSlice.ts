import { ICar, IRental } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  RentalState = {
  activeUserRental: IRental | null;  
  avaliableCars: ICar[] | null;
}

const initialState: RentalState = {
  activeUserRental: null,
  avaliableCars: null
}

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    setActiveUserRental:(state, action: PayloadAction<IRental | null>) => {
      state.activeUserRental = action.payload
    },
    setAvaliableCars: (state, action: PayloadAction<ICar[]>) => {
      state.avaliableCars = action.payload
    }
  }
})

export const { setActiveUserRental, setAvaliableCars } = rentalSlice.actions;
export default rentalSlice.reducer;