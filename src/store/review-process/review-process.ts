import { NameSpace } from '../../const';
import { ReviewProcess } from '../../types/state';
import { fetchFilmReviews } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState:ReviewProcess = {
  filmReviews: [],
  isFilmReviewsLoading: false
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviews.pending, (state) => {
        state.isFilmReviewsLoading = true;
      })
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.filmReviews = action.payload;
        state.isFilmReviewsLoading = false;
      });
  },
});
