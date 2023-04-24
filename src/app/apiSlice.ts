import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { EventGenre, EventListRequest, Events } from './event-types';
import { API_KEY, CLASSIFICATION_ID, COUNTRY_CODE } from './constants';
import { transformEvent, transformGenre } from './transform-helpers';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
    > =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axios({ url: baseUrl + url, method, data, params })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError as AxiosError
        console.log(err);
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://app.ticketmaster.com/discovery/v2',
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getGenres: builder.query<EventGenre[], void>({
      query: () => ({
        url: `/classifications/${CLASSIFICATION_ID}?apikey=${API_KEY}`,
        method: 'get',
      }),
      transformResponse: (rawResult: any) => {
        return rawResult.segment._embedded.genres.map((item:any) => transformGenre(item));
      },
    }),
    getEvents: builder.query<Events, EventListRequest>({
      query: ({ genreId, keyword }) => ({
        url: `/events?countryCode=${COUNTRY_CODE}&classificationId=${CLASSIFICATION_ID}&apikey=${API_KEY}`,
        method: 'get',
        params: {
          genreId: genreId.join(','),
          keyword
        }
      }),
      transformResponse: (rawResult: any) => {
        return rawResult._embedded ? rawResult._embedded.events.map((item:any) => transformEvent(item)) : [];
      },
    }),
    // getEvent: builder.query<Events, string>({
    //   query: (id) => ({
    //     url: `/events/${id}?apikey=${API_KEY}`,
    //     method: 'get',
    //   }),
    //   transformResponse: (rawResult: any) => {
    //     return rawResult;
    //   },
    // }),
  }),
});

export const { useGetEventsQuery, useGetGenresQuery } = clientApi;
