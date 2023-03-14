import httpRequest from "../utils/httpRequest";

export const fetchAddAuthor = async (authorName: string) => httpRequest.post('/authors/add', {name: authorName})

export const fetchAuthors = async () => httpRequest.get('/authors/all')

export const getAuthorById = async (id: string) => httpRequest.get(`authors/${id}`)
