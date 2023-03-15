import { ILoginResponse, ILoginer, IAuthResponse, IRegistrationResponse, IRegister } from "../types/user.type";
import httpRequest from '../utils/httpRequest'


export const fetchLogin = 
async (loginer: ILoginer): Promise<ILoginResponse> => 
httpRequest.post('/login', loginer)

export const fetchLogout = 
async () => 
httpRequest.delete('/logout')
  
export const fetchAuthorization = 
async (): Promise<IAuthResponse> => 
httpRequest.get('/users/me')

export const fetchRegistration = 
async (newUser: IRegister): Promise<IRegistrationResponse> => 
httpRequest.post('/register', newUser)


