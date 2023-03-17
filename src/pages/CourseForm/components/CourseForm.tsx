import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import { formatTime } from "../../../utils";
import { H4, CH2, CH4 } from "../../../components/Title";
import React from "react";
import InputField from "../../../components/InputField";
import { FormikFormProps, FormikValues } from "formik";
import { ICourseFormDetail } from "..";
import { fetchAddAuthor, fetchAuthors } from "../../../services/author";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourseById } from "../../../services/course";
import noti from "../../../utils/noti";
import { AUTHOR_QUERY, COURSE_QUERY } from "../../../queries";
import AuthorItem from "./AuthorItem";
import { IAuthor } from "../../../types/author.type";

const CourseForm: FunctionComponent<
  FormikFormProps & FormikValues & { data: ICourseFormDetail }
> = (props) => {
  let { values, handleSubmit, setValues } = props;
  let { courseId } = useParams();
  const queryClient = useQueryClient();

  const courseQuery = useQuery({
    queryKey: [COURSE_QUERY, courseId],
    queryFn: () => fetchCourseById(courseId as string),
    enabled: Boolean(courseId),
  });

  const authrosQuery = useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthors,
  });
  const authors = authrosQuery.data?.result;
  const addAuthorMutation = useMutation({
    mutationFn: (name: string) => fetchAddAuthor(name),
    onSuccess: () => {
      noti({ type: "success", message: "Add Author Succeed." });
      queryClient.invalidateQueries([AUTHOR_QUERY]);
    },
  });

  useEffect(() => {
    if (courseId && courseQuery?.data) setValues(courseQuery?.data?.result);
  }, [courseId, courseQuery.data]);

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

  const handleAuthorToCourseAuthorClick = (id: string) => {
    const newAuthors = [...(values.authors || []), id];
    setValues({
      ...values,
      authors: newAuthors,
    });
  };

  const handleCourseAuthorToAuthorClick = (id: string) => {
    const newAuthors = values.authors.filter(
      (authorId: string) => authorId !== id
    );
    setValues({
      ...values,
      authors: newAuthors,
    });
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
            <Box>
              <CH4 text="Course Authors" />
              <div>
                {values.authors?.map((id: string) => {
                  const theAuthor = authors?.filter(
                    (author) => author.id === id
                  )[0];
                  return (
                    <AuthorItem
                      key={id}
                      author={theAuthor || ({} as IAuthor)}
                      buttonText="Delete Author"
                      handleClick={(event) =>
                        handleCourseAuthorToAuthorClick(id)
                      }
                    />
                  );
                })}
              </div>
              <CH4 text="Authors" />
              <div>
                {authors?.map(
                  (author) =>
                    !values.authors?.includes(author.id) && (
                      <AuthorItem
                        key={author.id}
                        author={author}
                        buttonText="Add Author"
                        handleClick={(event) =>
                          handleAuthorToCourseAuthorClick(author.id)
                        }
                      />
                    )
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseForm;
