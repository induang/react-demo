import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import noti from './noti'

const httpRequest = axios.create({
	baseURL: 'http://localhost:4000/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Cache-Control': 'no-cache',
	}
})

httpRequest.interceptors.request.use(
	(config) => {
	const token = window.localStorage.getItem('user_token') || ''
	if(config.headers) {
		config.headers.Authorization = token
	}
	return config
},
	(error) => {
		Promise.reject(error)
	}
)

httpRequest.interceptors.response.use(
	(response) => {
		const token = response.headers?.Authorization
		token && window.localStorage.setItem('user_token', token);	
		return response
	},
	(error) => {
		const message = error.response?.data?.errorMessage || error.message
		noti({
			type: 'error', message
		})

		if(error.response?.status === 401){
			noti({
				type: 'error',
				message: 'Unauthorization.'
			})
			window.localStorage.removeItem('user_token')
			window.location.href = '/login'
		}
		console.log(error) // TODO noti
	}
)

export default httpRequest