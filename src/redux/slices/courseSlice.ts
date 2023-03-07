import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchAddCourse,
	fetchCoursesData,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from '../../services/course';
import { CourseDetail, INewCourseInfo } from '../../types/course.type';
import { AppDispatch } from '../../types/store.type';

export interface CoursesState {
	courses: CourseDetail[];
}

const initialState: CoursesState = {
	courses: [],
};

export const courseSliceName = 'course';
export const courseSlice = createSlice({
	name: courseSliceName,
	initialState,
	reducers: {
		getCourses: (state, { payload }) => {
			const { result } = payload;
			return {
				...state,
				courses: [...result],
			};
		},
		saveCourse: (state) => {
			return { ...state };
		},
		deleteCourse: (state, { payload }) => {
			const { courseID } = payload;
			return {
				...state,
				courses: [
					...state.courses.filter((course: CourseDetail) => courseID !== course.id),
				],
			};
		},
		updateCourse: (state) => {},
	},
});

export const { getCourses, saveCourse, deleteCourse, updateCourse } =
	courseSlice.actions;

export default courseSlice.reducer;

export const saveCourseAsyncThunk = createAsyncThunk(
	'',
	async (course: INewCourseInfo, thunkAPI) => {
		const res = await fetchAddCourse(course);
		const { result } = res.data
		return { result: result };
	}
);

export const updateCourseAsyncThunk = createAsyncThunk(
	'',
	async (course: CourseDetail, thunkAPI) => {
		await fetchUpdateCourse(course);
	}
);

export const getCoursesThunk = () => async (dispatch: AppDispatch) => {
	const { result } = await fetchCoursesData();
	dispatch(getCourses({ result }));
};

export const saveCourseThunk =
	(course: INewCourseInfo) => async (dispatch: AppDispatch) => {
		await dispatch(saveCourseAsyncThunk(course)).unwrap();
		dispatch(saveCourse());
	};

export const deleteCourseThunk =
	(courseID: string) => async (dispatch: AppDispatch) => {
		await fetchDeleteCourse(courseID);
		dispatch(deleteCourse({ courseID }));
	};

export const updateCourseThunk =
	(course: CourseDetail) => async (dispatch: AppDispatch) => {
		console.log('thunk: ', course);
		await dispatch(updateCourseAsyncThunk(course)).unwrap();
		dispatch(updateCourse());
	};
