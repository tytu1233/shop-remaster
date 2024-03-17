import { apiSlice } from "../apiSlice";

type AllProduct = {
  productId: number;
  name: string;
  price: number;
};

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllProduct[], number>({
      query: (page: number) => ({
        url: "/product",
        params: {
          pageNumber: page,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: (response: AllProduct[]) => {
        const newData = response?.content?.map((resp) => {
          return {
            ...resp,
            name: resp.name.toUpperCase(),
          };
        });
        return newData;
      },
      merge: (currentData, newData) => {
        currentData.push(...newData);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ productId }) => ({
                type: "products" as const,
                productId,
              })),
              { type: "products", id: "LIST" },
            ]
          : [{ type: "products", id: "LIST" }],
    }),
    addProduct: builder.mutation<null, { name: string }>({
      query: ({ ...patch }) => ({
        url: "/product/create",
        method: "POST",
        body: patch,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddProductMutation } =
  productsApiSlice;
