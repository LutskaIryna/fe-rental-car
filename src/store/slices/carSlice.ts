import { ICar, IItem } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CarState = {
  cars: ICar[] | null;
  brands: IItem[];
  models: IItem[];
  colorList: string[];
};

const initialState: CarState = {
  cars: null,
  brands: [],
  models: [],
  colorList: [],
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
    setBrands: (state, action: PayloadAction<IItem[]>) => {
      state.brands = action.payload;
    },
    setModels: (state, action: PayloadAction<IItem[]>) => {
      state.models = action.payload;
    },
    setColorList: (state, action: PayloadAction<string[]>) => {
      state.colorList = action.payload;
    },
  },
});

export const { setCars, setBrands, setModels } = carSlice.actions;
export default carSlice.reducer;
