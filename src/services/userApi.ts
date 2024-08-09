import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<any, string>({
      query: (userId) => `user?userId=${userId}`,
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = userApi;
