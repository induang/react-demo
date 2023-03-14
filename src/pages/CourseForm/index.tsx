import { withFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { fetchAddCourse, fetchUpdateCourse } from "../../services/course";
import { createTodayDate } from "../../utils";
import CourseForm from "./components/CourseForm";
import validator from "./validator";

export interface ICourseFormDetail {
  id?: string;
  title: string;
  description: string;
  duration: number;
  newAuthor?: string;
  authors: string[];
}

interface ICourseFormProps {
  data?: ICourseFormDetail;
}
export default withFormik<ICourseFormProps, ICourseFormDetail>({
  mapPropsToValues(props) {
    const data: ICourseFormDetail | undefined = props.data;
    if (data) {
      return data;
    }
    return {} as ICourseFormDetail;
  },
  enableReinitialize: true,

  validationSchema: validator,
  handleSubmit: async (values) => {
    console.log("handle submit: ", values);
    let date = createTodayDate();
    let newCourse = {
      title: values.title,
      description: values.description,
      creationDate: date,
      duration: values.duration,
      authors: values.authors,
    };
    console.log("values: ", newCourse);
    if (values.id) {
      console.log("save course");
      fetchUpdateCourse({ ...newCourse, id: values.id })
        .then(() => console.log("update success."))
        .catch((error) => console.log(error)); // TODO
    } else {
      fetchAddCourse(newCourse).then(
        () => console.log("create success.") // TODO
      );
    }
  },
  displayName: "CourseForm",
})(CourseForm);
