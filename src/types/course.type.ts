export interface ICourseDetail {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: number;
	authors: string[];
}

export interface ICoursesResponse {
	successful: string;
	result: ICourseDetail[]
}

export interface ITheCourseResponse {
	successful: string;
	result: ICourseDetail;
}