import httpRequest from "../utils/httpRequest";
export const fetchCourses = async () => httpRequest.get('/courses/all');
export const fetchCourseById = async (id) => httpRequest.get(`/courses/${id}`);
export const fetchAddCourse = async (newCourse) => httpRequest.post('/courses/add', newCourse);
export const fetchDeleteCourse = async (courseID) => httpRequest.delete(`/courses/${courseID}`);
export const fetchUpdateCourse = async (course) => httpRequest.put(`/courses/${course.id}`, course);
