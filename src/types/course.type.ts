export interface CourseDetail {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface INewCourseInfo {
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}