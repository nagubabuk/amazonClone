import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import { validationSchema } from '../../components/DynamicForm/validation';

const Register:React.FC=()=> {
    const navigate=useNavigate();
    const handleSubmit = (values: any) => {
        // Send registration data to the server
        console.log(values);

        // Assuming the registration is successful, show success message and redirect to login
        alert('Registration successful. Please login.');
        navigate('/login');
    };


    const fields = [
        { name: 'username', label: 'Username', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    ];

    return <DynamicForm fields={fields} onSubmit={handleSubmit} validationSchema={validationSchema(fields)} />;
}

export default Register
