/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchData = createAsyncThunk('weather/fetchData', async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=tashkent&units=metric&APPID=f49653e026f6bd0c4262ce24fd7466ae`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const searchCity = createAsyncThunk('weather/searchCity', async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=f49653e026f6bd0c4262ce24fd7466ae`);
      return response.data;
    } catch (error) {
      throw error;
    }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userss: [],
    citySearch: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.userss = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.userss = [];
        state.loading = false;
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        state.citySearch = action.payload;
        state.loading = false;
      })
      .addCase(searchCity.rejected, (state, action) => {
        state.citySearch = [];
        state.loading = false;
      });
  },
});

// Export the reducer
export default userSlice.reducer;