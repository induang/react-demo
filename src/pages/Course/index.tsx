import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";

import SearchBar from "./components/SearchBar";
import CourseCard from "./components/CourseCard";
import React from "react";
import { ICourseDetail } from "../../types/course.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourses } from "../../services/course";
import { fetchAuthors } from "../../services/author";

const Course: React.FC = () => {
  const courses = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  const authorsQuery = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });
  const authenQuery = useQuery({
    queryKey: ['auth'],
    queryFn: 
  })
  function courseFilter(course: ICourseDetail, value: string) {
    return (
      course.title.toLowerCase().search(new RegExp(value, "i")) !== -1 ||
      course.id.search(value) !== -1
    );
  }
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
          <CourseCard key={course.id} course={course} />
        ))}
      </Box>
    </Box>
  );
};
export default Course;
