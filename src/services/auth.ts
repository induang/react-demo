import { AxiosResponse } from "axios";
import { ILoginer } from "../types/user.type";
import httpRequest from '../utils/httpRequest'

interface IAuthResponse {
	successful: string;
	result: string
}
export const fetchLogin = async (loginer: ILoginer): Promise<AxiosResponse<IAuthResponse>> => httpRequest.post('/login', loginer, { headers: {
	isLoading: true
}})

export const fetchLogout = async () => httpRequest.delete('/logout')

export const fetchAuthorization = async () => httpRequest.get('/users/me')

export const fetchRegistration = async (newUser) => httpRequest.post('/register', newUser)


