import { useState } from "react";
import axios from "axios";

const useForm = () => {

    const [formValues, setFormValues] = useState({});

    const handleChange = (event) => {
        event.persist();
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        let comment = {
            video_id: 'DxfEbulyFcY',
            comment: formValues.value,
            likes: 0,
            dislikes: 0,
        }
        let response = axios.post('http://127.0.0.1:8000/comment/', comment);
        event.preventDefault();
    }
    return { formValues, handleChange, handleSubmit};
}

export default useForm;