import { withFormik } from "formik";
import { fetchAddCourse, fetchUpdateCourse } from "../../services/course";
import noti from "../../utils/noti";
import CourseForm from "./components/CourseForm";
import validator from "./validator";
export default withFormik({
    mapPropsToValues(props) {
        const data = props.data;
        if (data) {
            return data;
        }
        return {};
    },
    enableReinitialize: true,
    validationSchema: validator,
    handleSubmit: async (values) => {
        let newCourse = {
            title: values.title,
            description: values.description,
            duration: Number(values.duration),
            authors: values.authors,
        };
        if (values.id) {
            console.log("save course");
            fetchUpdateCourse({ ...newCourse, id: values.id }).then(() => {
                window.location.href = "/courses";
                noti({ type: "success", message: "Update Course Succeed." });
            });
        }
        else {
            fetchAddCourse(newCourse).then(() => {
                window.location.href = "/courses";
                noti({ type: "success", message: "Add Course Succeed." });
            });
        }
    },
    displayName: "CourseForm",
})(CourseForm);
