import { setBrands, setModels } from "../slices/carSlice";
import { api } from "./api";

export const brandModelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<any, void>({
      query: () => "/car-brand",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setBrands(data));
          }
        } catch (error) {
          console.error("Error while fetching brands:", error);
        }
      },
    }),
    getModels: builder.query<any, string>({
      query: (id) => ({
        url: `/car-model/${id}`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setModels(data));
          }
        } catch (error) {
          console.error("Error while fetching modals:", error);
        }
      },
    }),
  }),
});

export const { useGetBrandsQuery, useGetModelsQuery } = brandModelApi;
