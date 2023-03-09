import httpRequest from "../utils/httpRequest";

export const fetchAddAuthor = async (authorName) => httpRequest.post('/authors/add', {name: authorName})

export const fetchAuthorsData = async () => httpRequest.get('/authors/all')

export const getAuthorById = async (id: string) => httpRequest.get(`authors/${id}`)
