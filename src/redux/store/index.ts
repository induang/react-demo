import { configureStore } from '@reduxjs/toolkit';
import authorSlice, { authorSliceName } from '../slices/authorSlice';
import courseSlice, { courseSliceName } from '../slices/courseSlice';

import userSlice, { userSliceName } from '../slices/userSlice';

const store = configureStore({
	reducer: {
		[userSliceName]: userSlice,
		[courseSliceName]: courseSlice,
		[authorSliceName]: authorSlice
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
