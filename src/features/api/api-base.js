import "isomorphic-fetch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceURL =
  process.env.REACT_APP_API_URL || `http://localhost:3030/api/v1`;

export const unusedDataKeepTime = 0.0001;

export const apiBase = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: serviceURL,
    prepareHeaders: async (headers, { getState }) => {
      // const token = getState().auth.userToken;
      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      //   return headers;
      // }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  endpoints: () => ({}),
});
