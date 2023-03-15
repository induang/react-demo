import { withFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { fetchAddCourse, fetchUpdateCourse } from "../../services/course";

import noti from "../../utils/noti";
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
    const navigate = useNavigate();
    let newCourse = {
      title: values.title,
      description: values.description,
      duration: values.duration,
      authors: values.authors,
    };
    if (values.id) {
      console.log("save course");
      fetchUpdateCourse({ ...newCourse, id: values.id }).then(() => {
        noti({ type: "success", message: "Update Course Succeed." });
        navigate("/courses");
      });
    } else {
      fetchAddCourse(newCourse).then(() => {
        noti({ type: "success", message: "Add Course Succeed." });
        navigate("/courses");
      });
    }
  },
  displayName: "CourseForm",
})(CourseForm);
