import { IAuthor, IAuthorsResponse, ICreateAuthorResponse } from "../types/author.type";
import httpRequest from "../utils/httpRequest";

export const fetchAddAuthor = 
async (authorName: string): Promise<ICreateAuthorResponse> => 
httpRequest.post('/authors/add', {name: authorName})

export const fetchAuthors = 
async (): Promise<IAuthorsResponse> => 
httpRequest.get('/authors/all')

export const getAuthorById = 
async (id: string): Promise<IAuthor> => 
httpRequest.get(`authors/${id}`)
