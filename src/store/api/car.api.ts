import { toast } from "sonner";
import { setCars } from "../slices/carSlice";
import { api } from "./api";
import { ICarFormData } from "@/types/interfaces";
import { RentalStateOfCar } from "@/types/enums";

export const carApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<
      any,
      {
        filter: RentalStateOfCar;
        brand?: string;
        vin?: string;
        model?: string;
        color?: string;
        year?: number;
        query?: string;
      }
    >({
      query: (queryParams) => ({
        url: "/rental-cars",
        params: queryParams,
      }),
      providesTags: ["Cars"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setCars(data));
          }
        } catch (error) {
          console.error("Error while fetching cars:", error);
          toast.error("Error while fetching cars");
        }
      },
    }),
    createCar: builder.mutation<any, ICarFormData>({
      query: (carData) => ({
        url: "/rental-cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: builder.mutation<any, string>({
      query: (id) => ({
        url: `/rental-cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
    getCarColorList: builder.query<any, void>({
      query: () => ({
        url: "/rental-cars/colors",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setCars(data));
          }
        } catch (error) {
          console.error("Error while fetching cars:", error);
          toast.error("Error while fetching cars");
        }
      },
    }),
  }),
});

export const {
  useGetCarsQuery,
  useDeleteCarMutation,
  useCreateCarMutation,
  useGetCarColorListQuery,
} = carApi;
