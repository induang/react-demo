import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
		if(config.headers.notoken){
			config.headers.Authorization = config.headers.Authorization || token
		}else {
			delete config.headers.notoken
		}
	}
	return config
},
	(error) => {
		Promise.reject(error)
	}
)

httpRequest.interceptors.response.use(
	(response) => {
		if(response.data.errorCode) {
			console.log('axios error: ',response.data) //TODO: notiStack
			return response
		}else {
			return response // legacy
		}
	},
	(error) => {
		if(error.response?.status === 401){
			window.localStorage.removeItem('user_token')
			window.location.href = '/login'
		}
		return console.log(error) // TODO: notiStack
	}
)

export default httpRequest