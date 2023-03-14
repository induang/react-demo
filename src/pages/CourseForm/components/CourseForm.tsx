import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import { formatTime } from "../../../utils";
import { H4, CH2 } from "../../../components/Title";
import React from "react";
import InputField from "../../../components/InputField";
import { FormikFormProps, FormikValues } from "formik";
import { ICourseFormDetail } from "..";
import { fetchAddAuthor, fetchAuthors } from "../../../services/author";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCourseById } from "../../../services/course";
import noti from "../../../utils/noti";

const CourseForm: FunctionComponent<
  FormikFormProps & FormikValues & { data: ICourseFormDetail }
> = (props) => {
  let { values, handleSubmit, setValues } = props;
  let { courseId } = useParams();

  const courseQuery = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId as string),
    enabled: courseId,
  });

  const authrosQuery = useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthors,
    enabled: courseId,
  });

  const addAuthorMutation = useMutation({
    mutationFn: (name: string) => fetchAddAuthor(name),
    onSuccess: () => {
      noti({ type: "success", message: "Add Author Succeed." });
    },
  });

  if (courseId && courseQuery?.data) setValues(courseQuery?.data?.result);

  const handleCreateAuthorClick = () => {
    if (values.newAuthor === "") {
      noti({ type: "warning", message: "author name should not be empty." });
    } else {
      addAuthorMutation.mutate(values.newAuthor);
      addAuthorMutation.isSuccess &&
        noti({
          type: "success",
          message: "Add Author Succeed.",
        });
    }
  };

  return (
    <Box p={3} component="form" onSubmit={handleSubmit}>
      {/* Title 部分 */}
      <Box>
        <H4 text="Title :" />
        <Grid container className="justify-between mb-6">
          <Grid item>
            <InputField
              name="title"
              label="Title"
              data-testid="course-test-title"
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              data-testid="course-test-save-btn"
            >
              save course
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Description 部分 */}
      <Box>
        <H4 text="Description :" />
        <InputField
          fullWidth
          multiline
          rows={5}
          name="description"
          label="Description"
          data-testid="course-test-description"
        />
      </Box>
      {/* Author 部分 */}
      <Box>
        <Grid container spacing={2} className="justify-between">
          <Grid item xs={6}>
            {/* 添加作者 */}
            <Box>
              <CH2 text="Add Author" />
              <H4 text="Author name :" />
              <InputField
                label="Author name"
                size="small"
                fullWidth
                name="newAuthor"
              />
              <div className="table m-auto mt-8">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCreateAuthorClick}
                >
                  Create author
                </Button>
              </div>
            </Box>
            {/* 设置持续时间 */}
            <Box>
              <CH2 text="Duration" />
              <H4 text="Duration :" />
              <InputField
                label="Duration"
                size="small"
                fullWidth
                name="duration"
                data-testid="course-test-duration"
              />
              <div className="text-3xl mt-8">
                Duration:&nbsp;
                <b>
                  {values.duration === "" ? "0" : formatTime(values.duration)}
                </b>
                &nbsp;Hours
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} className="flex justify-center">
            {/* 作者列表 */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseForm;
