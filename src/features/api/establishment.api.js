import { apiBase, unusedDataKeepTime } from "./api-base";

export const establismentsApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getAllEstablishments: builder.mutation({
      query: () => ({
        url: `/establishment`,
        method: "GET",
        keepUnusedDataFor: unusedDataKeepTime,
      }),
    }),

    addEstablishment: builder.mutation({
      query: ({
        name,
        address,
        addressLine2,
        city,
        ownerName,
        managerName,
      }) => ({
        url: "establishment",
        method: "POST",
        body: {
          name: name,
          address: address,
          addressLine2: addressLine2,
          city: city,
          ownerName: ownerName,
          managerName: managerName,
        },
      }),
    }),

    patchEstablishment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/establishment/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    deleteEstablishment: builder.mutation({
      query: ({ establishmentId }) => ({
        url: `/establishment/${establishmentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEstablishmentsMutation,
  useAddEstablishmentMutation,
  usePatchEstablishmentMutation,
  useDeleteEstablishmentMutation,
} = establismentsApi;
