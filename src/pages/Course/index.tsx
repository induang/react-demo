import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import SearchBar from "./components/SearchBar";
import CourseCard from "./components/CourseCard";
import { AppDispatch, RootState } from "../../types/store.type";
import { getCoursesThunk } from "../../redux/slices/courseSlice";
import { authorizeThunk } from "../../redux/slices/userSlice";
import React from "react";
import { CourseDetail } from "../../types/course.type";

const Course: React.FC = () => {
  const courses = useAppSelector((state: RootState) => state.course.courses);
  const dispatch: AppDispatch = useAppDispatch();
  const [curCourses, setCurCourses] = useState(courses);

  useEffect(() => {
    dispatch(getCoursesThunk());
    dispatch(authorizeThunk());
  }, []);

  useEffect(() => {
    setCurCourses(courses);
  }, [courses]);

  function courseFilter(course: CourseDetail, value: string) {
    return (
      course.title.toLowerCase().search(new RegExp(value, "i")) !== -1 ||
      course.id.search(value) !== -1
    );
  }

  function handleSearch(value: string) {
    setCurCourses([
      ...courses.filter((course: CourseDetail) => courseFilter(course, value)),
    ]);
  }

  return (
    <Box padding={3}>
      <Box>
        <Box>
          <Grid container className="flex justify-between">
            <Grid item>
              <SearchBar handleSearch={handleSearch} />
            </Grid>
            <Grid item>
              <Link to="add">
                <Button variant="outlined" color="secondary">
                  Add new course
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* 课程列表渲染 */}
        <Box>
          {curCourses && curCourses.length ? (
            curCourses.map((course: CourseDetail) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <span>Loading...</span>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Course;
