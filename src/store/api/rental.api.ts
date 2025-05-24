import { IRental, IRentalFormData } from "@/types/interfaces";
import { api } from "./api";
import { setActiveUserRental } from "../slices/rentalSlice";
import { toast } from "sonner";

export const rentalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRental: builder.mutation<any, IRentalFormData>({
      query: (rentalData) => ({
        url: "/rental",
        method: "POST",
        body: rentalData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          if (data) {
            dispatch(setActiveUserRental(data));
          }
        } catch (error) {
          console.error("Error while fetching active rental:", error);
          toast.error("Failed to load active rental information");
        }
      },
    }),
    getUserRental: builder.query<IRental[], void>({
      query: () => "/rental/active",
      providesTags: ["UserActiveRental"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setActiveUserRental(data?.length ? data[0] : null));
          }
        } catch (error) {
          console.error("Error while fetching active rental:", error);
          toast.error("Failed to load active rental information");
        }
      },
    }),
  }),
});

export const { useCreateRentalMutation, useGetUserRentalQuery } = rentalApi;
