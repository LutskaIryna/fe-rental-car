import { IRental } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  RentalState = {
  activeUserRental: IRental | null;
}

const initialState: RentalState = {
  activeUserRental: null
}

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    setActiveUserRental:(state, action: PayloadAction<IRental | null>) => {
      state.activeUserRental = action.payload
    }
  }
})

export const { setActiveUserRental } = rentalSlice.actions;
export default rentalSlice.reducer;