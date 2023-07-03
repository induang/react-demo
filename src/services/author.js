import httpRequest from "../utils/httpRequest";
export const fetchAddAuthor = async (authorName) => httpRequest.post('/authors/add', { name: authorName });
export const fetchAuthors = async () => httpRequest.get('/authors/all');
export const getAuthorById = async (id) => httpRequest.get(`authors/${id}`);
