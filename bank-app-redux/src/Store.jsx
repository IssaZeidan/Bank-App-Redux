import { configureStore, createSlice } from '@reduxjs/toolkit';

const accountsSlice = createSlice({
  name: 'accounts',
  reducers: {
    addAccount: (state, action) => {
      state.push(action.payload);
    },
  },
});

const rootReducer = accountsSlice.reducer;
export const { addAccount } = accountsSlice.actions;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
