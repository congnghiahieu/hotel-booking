import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../auth/authSlice';
import { BACKEND_ADDRESS } from '../../../utils/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_ADDRESS,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // // console.log(args) // request url, method, body
  // // console.log(api) // signal, dispatch, getState()
  // // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    // console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/v1/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  tagTypes: [
    'Hotel',
    'HotelImage',
    'User',
    'Fav',
    'Cart',
    'Comment',
    'Transaction',
    'Book',
    'Service',
    'ServiceImage',
  ],
  endpoints: builder => ({}),
});
