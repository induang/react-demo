export interface ILoginer {
	email: string;
	password: string;
}
export interface IRegister {
	name: string;
	email: string;
	password: string;
}
export interface ILoginResponse {
	successful: boolean;
	result: string;
	user: {
		email: string;
		name: string;
	}
}

export interface IAuthResponse {
	successful: boolean;
	result: {
		name: string;
		email: string;
		password: string;
		role: 'user' | 'admin';
		id: string;
	}
}

export interface IRegistrationResponse {
	successful: boolean
	result: string
}