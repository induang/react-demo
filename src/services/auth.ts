import { ILoginer } from "../types/user.type";

export const fetchLoginData = async (loginer: ILoginer) => {
	try {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(loginer),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) throw new Error('Login failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAuthorsData = async () => {
	try {
		const response = await fetch('http://localhost:4000/authors/all');
		if (!response.ok) throw new Error('Get Authors failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchLogout = async () => {
	try {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response) throw new Error('Logout failed.');
	} catch (e) {
		alert(e);
	}
};

export const fetchAuthorization = async () => {
	try {
		const response = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Authorization failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchRegistrationData = async (newUser) => {
	try {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) throw new Error('Registration failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};
