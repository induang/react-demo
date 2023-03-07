import httpRequest from "../utils/httpUtils/httpRequest";

export const fetchAddAuthor = async (authorName) => httpRequest.post('/authors/add', {name: authorName})


export const fetchAuthorsData = async () => httpRequest.get('/authors/all')
