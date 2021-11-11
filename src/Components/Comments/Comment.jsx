import axios from 'axios';
import React from 'react';
import useForm from '../CustomHooks/useForm';

function RegisterComment() {
    const { formValues, handleChange, handleSubmit } = useForm();

    return (
        <div className="comments-box">
            <form>
                <input value={ formValues.value } type='text' placeholder="Add a comment..." onChange={handleChange}/>
                <button onSubmit={handleSubmit} type='submit'className="comments-button">Post</button>
            </form>
        </div>
    )
}

export default RegisterComment;