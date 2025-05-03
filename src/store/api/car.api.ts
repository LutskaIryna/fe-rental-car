import { toast } from "sonner";
import { setCars } from "../slices/carSlice";
import { api } from "./api";
import { ICarFormData } from "@/types/interfaces";
import { setAvaliableCars } from "../slices/rentalSlice";

export const authApi = api.injectEndpoints({
  endpoints: builder => ({

    getCars: builder.query<any, void>({
      query: () => "/rental-cars",
      providesTags: ["Cars"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setCars(data));
          }
        } catch (error) {
          console.error("Error while fetching cars:", error)
          toast.error("Error while fetching cars")
        }
      }
    }),
    getAvailableCars: builder.query<any, void>({
      query: () => "/rental/available",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setAvaliableCars(data));
          }
        } catch (error) {
          console.error("Error while fetching cars:", error)
          toast.error("Error while fetching cars")
        }
      }
    }),
    createCar: builder.mutation<any, ICarFormData>({
      query: (carData) => ({
        url: "/rental-cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["Cars"]
    }),
    deleteCar: builder.mutation<any, string>({
      query: (id) => ({
        url: `/rental-cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  })
})

export const {
  useGetCarsQuery,
  useDeleteCarMutation,
  useGetAvailableCarsQuery,
  useCreateCarMutation
} = authApi;


