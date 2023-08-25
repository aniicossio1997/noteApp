// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import type { Pokemon } from './types'
import { supabase } from '../../supabase/supabaseClient'
import { INote,  } from '../../models/INote'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<string, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints


type NotesAllResponse = INote[]

interface IParamFullNote{
    user_id:string,
    note_id:string
}


export const supabaseApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes:['Notes'],
    endpoints: (builder) => ({
      getNotesByUser: builder.query<NotesAllResponse,string>({
        queryFn: async (user_id:string) => {
          
          const {data, error} = await supabase
            .from('notes')
            .select('id, user_id,title,created_at')
            .eq('user_id',user_id)
            .order('created_at',{ascending:false})
          if (error) {
            throw { error };
          }

          return { data } ;
        }
      }),
      getFullNoteByUser:builder.query({
        async queryFn(params:IParamFullNote) {
          
          const { note_id, user_id } = params;
          const {data, error} = await supabase
            .from('notes')
            .select('id, user_id,title,description,created_at')
            .eq('user_id',user_id)
            .eq('id',Number(note_id))
          if (error) {
            throw { error };
          }
          console.log(data)
          return {data};
        }
      }),

    })
  })
export const { useGetNotesByUserQuery,useGetFullNoteByUserQuery } = supabaseApi

