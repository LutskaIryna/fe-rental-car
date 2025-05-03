import { RootState } from "../store";

export const selectActiveUserRental = (state: RootState) => state.rental.activeUserRental;