// src/redux/jsonSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JsonState {
  data: any; // Your JSON data type
}

const initialState: JsonState = {
  data: [],
};

const jsonSlice = createSlice({
  name: 'json',
  initialState,
  reducers: {
    updateJsonData: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = [ ...state.data, action.payload ];
    },
  },
});

export const { updateJsonData } = jsonSlice.actions;
export const storedJsonData = (state: any) => state.json.data;
export default jsonSlice.reducer;
