import { AxiosResponse } from "axios";
import { ICourseDetail } from "../types/course.type";
import httpRequest from "../utils/httpRequest";

interface ICourseResponse {
	successful: string;
	result: ICourseDetail[]
}

export const fetchCourses = async ():Promise<AxiosResponse<ICourseResponse>> => httpRequest.get('/courses/all', {
	headers:{
		isLoading: true
	}
})

export const fetchCourseById = async (id: string) => httpRequest.get(`/courses/${id}`)

export const fetchAddCourse = async (newCourse: ICourseDetail) => httpRequest.post('/courses/add', newCourse)

export const fetchDeleteCourse = async (courseID: string) => httpRequest.delete(`/courses/${courseID}`)

export const fetchUpdateCourse = async (course: ICourseDetail) => httpRequest.put(`/courses/${course.id}`, course)