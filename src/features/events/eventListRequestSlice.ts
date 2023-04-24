import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EventGenreId, EventKeyword, EventListRequest } from '../../app/event-types';

const initialState: EventListRequest = {
  genreId: [],
  keyword: '',
};

export const eventListRequestSlice = createSlice({
  name: 'eventListRequest',
  initialState,
  reducers: {
    toggleEventGenreId: (state, action: PayloadAction<EventGenreId>) => {
      if (state.genreId.includes(action.payload)) {
        const index = state.genreId.findIndex(item => item === action.payload);
        state.genreId.splice(index, 1);
      } else {
        state.genreId.push(action.payload);
      }
    },
    resetEventGenreId: (state) => {
      state.genreId = [];
    },
    updateEventKeyword: (state, action: PayloadAction<EventKeyword>) => {
      state.keyword = action.payload;
    },
  },
});

export const { toggleEventGenreId, resetEventGenreId, updateEventKeyword } = eventListRequestSlice.actions;

export const selectEventGenreId = (state: RootState) => state.eventListRequest.genreId;
export const selectEventKeyword = (state: RootState) => state.eventListRequest.keyword;

export default eventListRequestSlice.reducer;