import httpRequest from '../utils/httpRequest';
export const fetchLogin = async (loginer) => httpRequest.post('/login', loginer);
export const fetchLogout = async () => httpRequest.delete('/logout');
export const fetchAuthorization = async () => httpRequest.get('/users/me');
export const fetchRegistration = async (newUser) => httpRequest.post('/register', newUser);
