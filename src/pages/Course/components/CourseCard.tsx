import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Grid, Button, Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";

import { H1 } from "../../../common/Title";
import { RootState } from "../../../types/store.type";
import { deleteCourseThunk } from "../../../redux/slices/courseSlice";
import { Author, getAuthorsThunk } from "../../../redux/slices/authorSlice";
import { formatTime, formatDate } from "../../../utils";
import { useAppSelector, useAppDispatch } from "../../../redux/store/hooks";
import { CourseDetail } from "../../../types/course.type";
import React from "react";

type CourseCardProps = {
  course: CourseDetail;
};

function CourseCard({ course }: CourseCardProps) {
  const { role } = useAppSelector((state: RootState) => state.user);
  const authors = useAppSelector((state: RootState) => state.author.authors);

  const navigate = useNavigate();

  return (
    <Paper elevation={2} className="my-1 p-1">
      <Grid container spacing={2} className="p-5">
        <Grid item md={7}>
          <H1 text={course.title} />
          <div className="w-11/12 indent-2">{course.description}</div>
        </Grid>
        <Grid item md={5} className="flex-col justify-center">
          <div id="author" className="w-80 truncate">
            <b>Authors:&nbsp;&nbsp;</b>
            {course.authors.map(
              (id) =>
                authors.filter((author: Author) => author.id === id)[0]?.name
            ) + " "}
          </div>
          <div id="durations">
            <b>Duration:&nbsp;&nbsp;</b>
            {`${formatTime(course.duration)} hours`}
          </div>
          <div id="created">
            <b>Created:&nbsp;&nbsp;</b>
            {formatDate(course.creationDate)}
          </div>
          <div id="showCourseBtn">
            <Box className="mt-5">
              <Grid container spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Show Courses
                </Button>
                <AdminPanel isShow={role === "admin"} courseId={course.id} />
              </Grid>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

interface AdminPanelProps {
  isShow: boolean;
  courseId: string;
}

function AdminPanel({ isShow, courseId }: AdminPanelProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteCourseClick = (id: string) => {
    dispatch(deleteCourseThunk(id));
  };
  return (
    <>
      {isShow ? (
        <>
          <Grid item>
            <Button
              color="secondary"
              onClick={() => handleDeleteCourseClick(courseId)}
            >
              <DeleteIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              onClick={() => navigate(`/courses/update/${courseId}`)}
            >
              <EditRoundedIcon />
            </Button>
          </Grid>
        </>
      ) : (
        <span />
      )}
    </>
  );
}

export default CourseCard;
