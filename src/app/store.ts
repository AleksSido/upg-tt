import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { clientApi } from './apiSlice';
import eventPreviewRequestReducer from '../features/events/preview/eventPreviewRequestSlice';
import eventListRequestReducer from '../features/events/eventListRequestSlice';

export const store = configureStore({
	reducer: {
		[clientApi.reducerPath]: clientApi.reducer,
		eventListRequest: eventListRequestReducer,
		eventPreviewRequest: eventPreviewRequestReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(clientApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
