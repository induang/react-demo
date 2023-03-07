import { AxiosResponse } from "axios";
import { ILoginer } from "../types/user.type";
import httpRequest from '../utils/httpUtils/httpRequest'

interface LoginResponse {
	user: any;
	result: string
}
export const fetchLoginData = async (loginer: ILoginer): Promise<AxiosResponse<LoginResponse>> => httpRequest.post('/login', loginer)

export const fetchLogout = async () => httpRequest.delete('/logout')

export const fetchAuthorization = async () => httpRequest.get('/users/me')

export const fetchRegistrationData = async (newUser) => httpRequest.post('/register', newUser)


