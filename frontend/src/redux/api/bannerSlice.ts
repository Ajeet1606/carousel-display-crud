import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from "../../routes/IPConfig";
import { BannerType, CreateBannerType } from "src/components/home/data";

const BASE_URL = `${IP}/banner/`;

interface GetAllBannersResponseType{
    data: BannerType[]
    error: string
    message: string;
}

interface CreateBannerResponseType{
    data: BannerType
    error: string
    message: string;
}

interface DeleteBannerResponseType{
    data: null
    error: string
    message: string;
}

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    getBanners: builder.query<GetAllBannersResponseType, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `${BASE_URL}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    createBanner: builder.mutation<CreateBannerResponseType, CreateBannerType>({
      query: (data) => ({
        url: BASE_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),

    updateBanner: builder.mutation<CreateBannerResponseType, { id: string; data: CreateBannerType }>({
      query: ({ id, data }) => ({
        url: `${BASE_URL}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation<DeleteBannerResponseType, number>({
      query: (id) => ({
        url: `${BASE_URL}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),

    getBannerById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${id}`,
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    toggleVisibility: builder.mutation({
      query: ({ id }) => ({
        url: `${BASE_URL}toggle-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetBannerByIdQuery,
  useToggleVisibilityMutation,
} = bannerApi;
