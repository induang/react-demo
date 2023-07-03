import * as yup from 'yup';
const validator = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    duration: yup.number().required().positive().integer()
});
export default validator;
