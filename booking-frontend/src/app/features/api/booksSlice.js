import { apiSlice } from './apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { QUERY } from '../../../utils/constants';

const booksAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = booksAdapter.getInitialState();

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBooksByUserId: builder.query({
      keepUnusedDataFor: 60,
      query: ({ userId, populate }) => `/v1/books?user_id=${userId}&populate=${populate}`,
      transformResponse: response => {
        const modifiedData = response.map(dt => {
          const modified = {
            ...dt,
            id: dt._id,
          };
          delete modified._id;
          return modified;
        });

        return modifiedData;
      },
      providesTags: (result, error, arg) => {
        return [
          { type: 'Book', id: arg.userId },
          ...result.map(dt => ({ type: 'Book', id: dt.id })),
        ];
      },
    }),
    addBook: builder.mutation({
      query: newBookData => ({
        url: '/v1/books',
        method: 'POST',
        body: newBookData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Book', id: arg.userId },
        { type: 'Book', id: arg.hotelId },
        { type: 'Book', id: arg.serviceId },
      ],
    }),
    updateBookById: builder.mutation({
      query: ({ bookId, flag }) => ({
        url: `/v1/books/update_info`,
        method: 'PUT',
        body: {
          id: bookId,
          flag,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', id: arg.bookId }],
    }),
  }),
});

export const { useGetBooksByUserIdQuery, useAddBookMutation, useUpdateBookByIdMutation } =
  booksApiSlice;
