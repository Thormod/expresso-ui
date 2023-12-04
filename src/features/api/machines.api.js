import { apiBase, unusedDataKeepTime } from "./api-base";

export const machinesApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getMachine: builder.mutation({
      query: (id) => ({
        url: `/machine/${id}`,
        method: "GET",
        keepUnusedDataFor: unusedDataKeepTime,
      }),
    }),
  }),
});

export const { useGetMachineMutation } = machinesApi;
