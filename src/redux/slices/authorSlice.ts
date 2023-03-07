import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddAuthor, fetchAuthorsData } from '../../services/author';
import { AppDispatch } from '../../types/store.type';

export interface Author {
	id: string;
	name: string;
}

export interface AuthorState {
	authors: Author[];
}

const initialState: AuthorState = {
	authors: [],
};

export const authorSliceName = 'author';
export const authorSlice = createSlice({
	name: authorSliceName,
	initialState,
	reducers: {
		getAuthors: (state, { payload }) => {
			const { result } = payload;
			return {
				...state,
				authors: [...result],
			};
		},
		saveAuthor: (state, { payload }) => {
			const { result } = payload;
			return { ...state, authors: [...state.authors, result] };
		},
	},
});

export const { getAuthors, saveAuthor } = authorSlice.actions;
export default authorSlice.reducer;

export const saveAuthorAsyncThunk = createAsyncThunk(
	'',
	async (authorName: string, thunkAPI) => {
		const res = await fetchAddAuthor(authorName);
		const { result } = res.data
		return { result };
	}
);

export const getAuthorsThunk = () => async (dispatch: AppDispatch) => {
	const { result } = await fetchAuthorsData();
	dispatch(getAuthors({ result }));
};

export const saveAuthorThunk =
	(authorName: string) => async (dispatch: AppDispatch) => {
		const { result } = await dispatch(
			saveAuthorAsyncThunk(authorName)
		).unwrap();
		dispatch(saveAuthor({ result }));
	};
