import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/api/v1"}),
  tagTypes: ['Trips', 'Travelers'],
  endpoints: builder => ({
    getAllTravelers: builder.query ({
      query: () => ({
        url: '/travelers',
        method: 'GET'
      }),
      providesTags: ['Travelers']
    }),
    getSingleTraveler: builder.query({
      query: (userId) => ({
        url: `/travelers/${userId}`,
        method: 'GET'
      }),
      providesTags: ['Travelers']
    }),
    getAllTrips: builder.query({
      query: () => ({
        url: '/trips',
        method: 'GET'
      }),
      providesTags: ['Trips']
    }),
    getAllDestinations: builder.query({
      query: () => ({
        url: '/destinations',
        method: 'GET'
      })
    }),
    addNewTrip: builder.mutation({
      query: ({id, userID, destinationID, travelers, date, duration, status, suggestedActivities}) => ({
        url: '/trips',
        method: 'POST',
        body: {id, userID, destinationID, travelers, date, duration, status, suggestedActivities}
      }),
      invalidatesTags: ['Trips'],
    }),
    addNewDestination: builder.mutation({
      query: ({id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerDay, image, alt}) => ({
        url: '/destinations',
        method: 'POST',
        body: {id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerDay, image, alt}
      })
    }),
    modifySingleTrip: builder.mutation({
      query: ({id, status, suggestedActivities}) => ({
        url: '/updateTrip',
        method: 'POST',
        body: {id, status, suggestedActivities}
      }),
      invalidatesTags: ['Trips']
    }),
    deleteSingleTrip: builder.mutation({
      query: (id) => ({
        url: `/Trips/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Trips']
    })
  })
})

export const {useGetAllTravelersQuery, useGetSingleTravelerQuery, useGetAllTripsQuery, useGetAllDestinationsQuery, useAddNewTripMutation, useAddNewDestinationMutation, useModifySingleTripMutation, useDeleteSingleTripMutation} = apiSlice