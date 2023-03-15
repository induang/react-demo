export interface IAuthor {
	id: string;
	name: string;
}

export interface IAuthorsResponse {
	successful: boolean;
	result: IAuthor[];
}

export interface ICreateAuthorResponse {
	successful: boolean;
  result: {
		name: string;
		id: string;
  }
}