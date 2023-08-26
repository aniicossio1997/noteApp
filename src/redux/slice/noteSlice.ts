// Need to use the React-specific entry point to allow generating React hooks
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
//import type { Pokemon } from './types'
import { supabase } from "../../supabase/supabaseClient";
import { IFormNote, INote, INoteFull } from "../../models/INote";
import { PostgrestResponse } from "@supabase/supabase-js";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<string, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

type NotesAllResponse = INote[];

interface IParamFullNote {
  user_id: string;
  note_id: string;
}

interface IParamCreatedNote {
  user_id: string;
  note: {
    title: string;
    description: string;
  };
}
interface IParamsUpdateNote{
  user_id:string,
  note_id:string,
  note:IFormNote
}

export const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotesByUser: builder.query<NotesAllResponse, string>({
      queryFn: async (user_id: string) => {
        const { data, error } = await supabase
          .from("notes")
          .select("id, user_id,title,created_at")
          .eq("user_id", user_id)
          .order("created_at", { ascending: false });
        if (error) {
          throw { error };
        }

        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Notes" as const, id })),
              { type: "Notes" },
            ]
          : [{ type: "Notes" }],
    }),
    getFullNoteByUser: builder.query({
      async queryFn(params: IParamFullNote) {
        const { note_id, user_id } = params;
        if(isNaN(Number(note_id))){
          return {
            data:[]
          }
        }
        const { data, error } = await supabase
          .from("notes")
          .select("id, user_id,title,description,created_at")
          .eq("user_id", user_id)
          .eq("id", Number(note_id));
        if (error) {
          throw { error };
        }

        return { data };
      },
      providesTags: ['Notes'],
    }),
    addNote: builder.mutation({
      async queryFn(params: IParamCreatedNote) {
        const { user_id, note } = params;
        const insertResponse: PostgrestResponse<INoteFull> = await supabase
          .from("notes")
          .insert({
            user_id: user_id,
            title: note.title,
            description: note.description,
          })
          .select();

        if (insertResponse.error) {
          const { error } = insertResponse;
          throw { error };
        }
        const resulData =
          insertResponse.data.length > 0 ? insertResponse.data[0] : null;
        return {
          data: {
            status: insertResponse.status,
            data: resulData,
          },
        };
      },
      invalidatesTags: [{ type: "Notes" }],
    }),
    deleteNote: builder.mutation({
      async queryFn(params: IParamFullNote) {
        const { note_id, user_id } = params;
        const { data, error, status } = await supabase
          .from("notes")
          .delete()
          .eq("user_id", user_id)
          .eq("id", Number(note_id));
        if (error) {
          throw { error };
        }

        return {
          data: {
            status,
            data,
          },
        };
      },
      invalidatesTags: [{ type: "Notes" }],
    }),
    updateNote: builder.mutation({
      async queryFn(params: IParamsUpdateNote) {
        const { note_id, user_id ,note} = params;
        if(isNaN(Number(note_id))){
          return {
            data:null
          }
        }
        const updateResponse: PostgrestResponse<INoteFull>= await supabase
          .from("notes")
          .update(note)
          .eq("user_id", user_id)
          .eq("id", Number(note_id))
          .select();

        if (updateResponse.error) {
          const {error}=updateResponse
          throw { error };
        }
        const resulData =
        updateResponse.data.length > 0 ? updateResponse.data[0] : null;
        return {
          data: {
            status:updateResponse.status,
            data:resulData,
          },
        };
      },
      invalidatesTags: [{ type: "Notes" }],

    }),
  }),
});
export const {
  useGetNotesByUserQuery,
  useGetFullNoteByUserQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = supabaseApi;
