import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import { formatDate, formatTime } from "../../utils";
import { RootState } from "../../types/store.type";
import { CourseDetail } from "../../types/course.type";
import { Author } from "../../redux/slices/authorSlice";
import { H1 } from "../../components/Title";
import React, { useEffect, useState } from "react";
import { fetchCourseById } from "../../services/course";

function CourseInfo() {
  let { courseId } = useParams();
  const authors = useSelector((state: RootState) => state.author.authors);
  const [course, setCourse] = useState({} as CourseDetail);

  useEffect(() => {
    fetchCourseById(courseId).then((res) => {
      setCourse(res.data.result);
    });
  }, []);

  return (
    <Box p={3}>
      <Link to="/courses">{"<"} Back to courses</Link>
      <Paper className="my-2 p-2">
        <H1 text={course?.title}></H1>
        <Grid container spacing={2}>
          <Grid item md={7}>
            <div className="p-2">
              <p>long description...</p>
            </div>
          </Grid>
          <Grid item md={5}>
            <div id="courseId">
              <b>ID:&nbsp;&nbsp;</b>
              <span>{course?.id}</span>
            </div>
            <div id="duration">
              <b>Duration:&nbsp;&nbsp;</b>
              <span>{formatTime(course?.duration) + " hours"}</span>
            </div>
            <div id="created">
              <b>Created:&nbsp;&nbsp;</b>
              <span>{formatDate(course?.creationDate)}</span>
            </div>
            <div id="authors">
              <b>Authors:&nbsp;&nbsp;</b>
              <div className="ml-2">
                {course?.authors?.map((id: string) => (
                  <div key={id}>
                    {
                      authors.filter((author: Author) => author.id === id)[0]
                        .name
                    }
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CourseInfo;
