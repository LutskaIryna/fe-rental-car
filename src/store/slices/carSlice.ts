import { ICar } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  CarState = {
  cars: ICar[] | null;
}

const initialState: CarState = {
  cars: null
}

const carSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    }
  }
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;