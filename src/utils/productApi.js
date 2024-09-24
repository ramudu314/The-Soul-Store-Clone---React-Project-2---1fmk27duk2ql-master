import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const auth = JSON.parse(localStorage.getItem('user'));

const token = auth?.token;

const productsHeader = {
    'projectId': 'dsc4zhei2sjh'
}

const authorizeHeaders = {
    'projectId': 'dsc4zhei2sjh',
    Authorization: `Bearer ${token}`,
}

const baseUrl = 'https://academics.newtonschool.co/api/v1/ecommerce';

const myParams = {
    limit: '850'

}

const createRequest = (url) => ({ url, headers: productsHeader, params: myParams  });
const createRequestAuth = (url) => ({ url, headers: authorizeHeaders, params: myParams });

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => createRequest(`/clothes/products`),
        }),
        getSingleProduct: builder.query({
            query: (productId) => createRequest(`/product/${productId}`)
        }),
        getCartItems: builder.query({
            query: () => createRequestAuth(`/cart`)
        }),
        getWishlistItems: builder.query({
            query: () => createRequestAuth(`/wishlist`)
        }),
        getOrderDetails: builder.query({
            query :()=> createRequestAuth(`/order/`)
        })
    })
})


export const { useGetProductsQuery, useGetSingleProductQuery, useGetCartItemsQuery, useGetWishlistItemsQuery, useGetOrderDetailsQuery } = productApi;

