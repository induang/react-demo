import httpRequest from "../utils/httpUtils/httpRequest";

export const fetchCoursesData = async () => httpRequest.get('/courses/all')

export const fetchAddCourse = async (newCourse) => httpRequest.post('/courses/add', newCourse)

export const fetchDeleteCourse = async (courseID) => httpRequest.delete(`/courses/${courseID}`)

export const fetchUpdateCourse = async (course) => httpRequest.put(`/courses/${course.id}`, course)