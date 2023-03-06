import { configureStore } from '@reduxjs/toolkit';

import userSlice, { userSliceName } from '../slices/userSlice';

const store = configureStore({
	reducer: {
		[userSliceName]: userSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
