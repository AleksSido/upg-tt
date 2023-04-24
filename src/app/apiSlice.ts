import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import {EventGenre, EventListRequest, Events} from './event-types';

const COUNTRY_CODE = 'FI';
const CLASSIFICATION_ID = 'KZFzniwnSyZfZ7v7nJ';
const API_KEY = '0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq';
const EVENT_CARD_IMAGE_RATIO = '3_2';
const EVENT_PREVIEW_IMAGE_RATIO = '16_9';

function transformDate(responseEventDate:any){
  if (responseEventDate) {
    const { localDate, localTime } = responseEventDate;
    return { localDate, localTime };
  } else {
    return undefined;
  }
}

function transformEvent(responseEvent:any) {
  const { id, name, images, dates, classifications, _embedded } = responseEvent;
  const cardImages = images.filter((item:any) => item.ratio === EVENT_CARD_IMAGE_RATIO);
  const previewImages = images.filter((item:any) => item.ratio === EVENT_PREVIEW_IMAGE_RATIO);
  const { start, end } = dates;
  const venues = _embedded.venues.map((item:any) => {
    const { city, country, state, address, name } = item;
    return { city, country, state, address, name };
  });
  const transformedClassifications = classifications.map((item:any) => {
    const { genre } = item;
    const { id, name } = genre;
    return { genre: { id, name} };
  });
  return {
    id,
    name,
    images: {
      card: cardImages,
      preview: previewImages
    },
    dates: {
      start: transformDate(start),
      end: transformDate(end)
    },
    venues,
    classifications: transformedClassifications
  };
}
function transformGenre(responseGenre:any){
  const { id, name } = responseGenre;
  return { id, name };
}
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
    getEvent: builder.query<Events, string>({
      query: (id) => ({
        url: `/events/${id}?apikey=${API_KEY}`,
        method: 'get',
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult._embedded.events;
      },
    }),
  }),
});

export const { useGetEventsQuery, useGetEventQuery, useGetGenresQuery } = clientApi;