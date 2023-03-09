import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchAuthorization,
	fetchLoginData,
	fetchLogout,
} from '../../services/auth';
import { AppDispatch } from '../../types/store.type';
import { ILoginer } from '../../types/user.type';

export interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

const initialState: UserState = {} as UserState;

export const userSliceName = 'user';
export const userSlice = createSlice({
	name: userSliceName,
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { user, result } = payload;
			window.localStorage.setItem('user_token', result);
			return {
				...state,
				isAuth: true,
				name: user.name,
				email: user.email,
				token: result,
			};
		},
		prepareForLogout: (state) => {
			return {
				...state,
				isAuth: false,
			};
		},
		logout: (state) => {
			window.localStorage.removeItem('user_token');
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		},
		authorize: (state, { payload }) => {
			const { user } = payload;
			return {
				...state,
				isAuth: true,
				name: user.name,
				email: user.email,
				role: user.role,
			};
		},
	},
});

export const { login, logout, authorize, prepareForLogout } = userSlice.actions;

export default userSlice.reducer;

const loginAsyncThunk = createAsyncThunk(
	'',
	async (loginer: ILoginer, thunkAPI) => {
		const res = await fetchLoginData(loginer);
		const { user, result} = res.data
		return {
			user,
			result
		};
	}
);

const authorizeAsyncThunk = createAsyncThunk('', async () => {
	const res = await fetchAuthorization();
	const { result } = res.data
	return {
		user: result,
	};
});

const logoutAsyncThunk = createAsyncThunk('', async () => {
	await fetchLogout();
});

export const loginThunk =
	(loginer: ILoginer) => async (dispatch: AppDispatch) => {
		const { user, result } = await dispatch(loginAsyncThunk(loginer)).unwrap();
		dispatch(login({ user, result }));
	};

export const logoutThunk = () => async (dispatch: AppDispatch) => {
	await dispatch(logoutAsyncThunk()).unwrap();
	dispatch(logout());
};

export const authorizeThunk = () => async (dispatch: AppDispatch) => {
	const { user } = await dispatch(authorizeAsyncThunk()).unwrap();
	dispatch(authorize({ user }));
};
