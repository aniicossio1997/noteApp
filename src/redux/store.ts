import { configureStore } from '@reduxjs/toolkit';
import { supabaseApi } from './slice/noteSlice';


export const store = configureStore({
  reducer: {
     [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat( supabaseApi.middleware )
})