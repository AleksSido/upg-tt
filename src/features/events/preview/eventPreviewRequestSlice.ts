import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventId } from '../../../app/event-types';
import { RootState } from '../../../app/store-types';

export interface EventPreviewRequestState {
	id: EventId | undefined;
}

const initialState: EventPreviewRequestState = {
	id: undefined,
};

export const eventPreviewRequestSlice = createSlice({
	name: 'eventPreviewRequest',
	initialState,
	reducers: {
		setEventId: (state, action: PayloadAction<EventId>) => {
			state.id = action.payload;
		},
		resetEventId: (state) => {
			state.id = undefined;
		},
	},
});

export const { setEventId, resetEventId } = eventPreviewRequestSlice.actions;

export const selectEventId = (state: RootState) => state.eventPreviewRequest.id;

export default eventPreviewRequestSlice.reducer;
