import { IRentalFormData } from "@/types/interfaces";
import { api } from "./api";

export const rentalApi = api.injectEndpoints({
  endpoints: builder => ({
    createRental: builder.mutation<any, IRentalFormData>({
      query: (rentalData) => ({
        url: "/rental",
        method: "POST",
        body: rentalData,
      })
    }),
  })
})

export const { useCreateRentalMutation } = rentalApi;