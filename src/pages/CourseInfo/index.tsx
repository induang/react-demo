import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";

import { formatDate, formatTime } from "../../utils";
import { H1 } from "../../components/Title";
import React from "react";
import { fetchCourseById } from "../../services/course";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IAuthor, IAuthorsResponse } from "../../types/author.type";
import { AUTHOR_QUERY, COURSE_QUERY } from "../../queries";

function CourseInfo() {
  let { courseId } = useParams();
  const courseQuery = useQuery({
    queryKey: [COURSE_QUERY, courseId],
    queryFn: () => fetchCourseById(courseId as string),
  });

  const course = courseQuery?.data?.result;
  const queryClient = useQueryClient();
  const authors: IAuthorsResponse | undefined = queryClient.getQueryData([
    AUTHOR_QUERY,
  ]);

  return (
    <Box p={3}>
      <Link to="/courses">{"<"} Back to courses</Link>
      <Paper className="my-2 p-2">
        <H1 text={String(course?.title)}></H1>
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
              <span>{formatTime(Number(course?.duration)) + " hours"}</span>
            </div>
            <div id="created">
              <b>Created:&nbsp;&nbsp;</b>
              <span>{formatDate(String(course?.creationDate))}</span>
            </div>
            <div id="authors">
              <b>Authors:&nbsp;&nbsp;</b>
              <div className="ml-2">
                {course?.authors?.map((id: string) => (
                  <div key={id}>
                    {
                      authors?.result?.filter(
                        (author: IAuthor) => author.id === id
                      )[0].name
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
