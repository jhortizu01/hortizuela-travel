import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/api/v1"}),
  tagTypes: [],
  endpoints: builder => ({
    getAllTravelers: builder.query ({
      query: () => ({
        url: '/travelers',
        method: 'GET'
      })
    }),
    getSingleTraveler: builder.query({
      query: ({userId}) => ({
        url: `/travelers/${userId}`,
        method: 'GET'
      })
    }),
    getAllTrips: builder.query({
      query: () => ({
        url: '/trips',
        method: 'GET'
      })
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
      })
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
      })
    }),
    deleteSingleTrip: builder.mutation({
      query: ({id}) => ({
        url: `/trips/${id}`,
        method: 'DELETE',
      })
    })
  })
})

export const {useGetAllTravelersQuery, useGetSingleTravelerQuery, useGetAllTripsQuery, useGetAllDestinationsQuery, useAddNewTripMutation, useAddNewDestinationMutation, useModifySingleTripMutation, useDeleteSingleTripMutation} = apiSlice