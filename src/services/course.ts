
import { ICourseDetail, ICoursesResponse, ITheCourseResponse } from "../types/course.type";
import httpRequest from "../utils/httpRequest";

export const fetchCourses = 
async ():Promise<ICoursesResponse> => 
httpRequest.get('/courses/all')

export const fetchCourseById = 
async (id: string): Promise<ITheCourseResponse> => 
httpRequest.get(`/courses/${id}`)

export const fetchAddCourse = 
async (newCourse: ICourseDetail) => 
httpRequest.post('/courses/add', newCourse)

export const fetchDeleteCourse = 
async (courseID: string) => 
httpRequest.delete(`/courses/${courseID}`)

export const fetchUpdateCourse = 
async (course: ICourseDetail) => 
httpRequest.put(`/courses/${course.id}`, course)