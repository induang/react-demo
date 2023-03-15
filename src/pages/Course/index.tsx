import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";

import SearchBar from "./components/SearchBar";
import CourseCard from "./components/CourseCard";
import React from "react";
import { ICourseDetail } from "../../types/course.type";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../../services/course";
import { fetchAuthors } from "../../services/author";
import { fetchAuthorization } from "../../services/auth";
import { AUTHOR_QUERY, AUTH_QUERY, COURSE_QUERY } from "../../queries";

const Course: React.FC = () => {
  const courses = useQuery({
    queryKey: [COURSE_QUERY],
    queryFn: fetchCourses,
  });
  const authorsQuery = useQuery({
    queryKey: [AUTHOR_QUERY],
    queryFn: fetchAuthors,
  });
  const authenQuery = useQuery({
    queryKey: [AUTH_QUERY],
    queryFn: fetchAuthorization,
  });
  const role = authenQuery?.data?.result.role || "";
  // function courseFilter(course: ICourseDetail, value: string) {
  //   return (
  //     course.title.toLowerCase().search(new RegExp(value, "i")) !== -1 ||
  //     course.id.search(value) !== -1
  //   );
  // }
  if (courses.isLoading) return <>Loading...</>;

  function handleSearch(value: string) {}

  return (
    <Box padding={3}>
      <Grid container className="justify-between">
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
      {/* 课程列表渲染 */}
      <Box>
        {courses.data?.result?.map((course: ICourseDetail) => (
          <CourseCard key={course.id} course={course} role={role} />
        ))}
      </Box>
    </Box>
  );
};
export default Course;
