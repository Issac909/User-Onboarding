import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values, errors, touched, status }, props ) => {
    const [user, setUser] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addUser(user);
        setUser({email:'', password:''});
    }

    useEffect(() => {
        status && setUser(user => [...user, status]);
        console.log('Status has changed', status)
    }, [status])

    return (
        <div className ='REPLACE'>
            <Form>
                {/*This is First Name on the form*/}
                <label htmlFor = 'firstName'>First name</label>
                <Field type = 'text' name = 'firstName' />
                {touched.firstName && errors.firstName && (<p className = 'errors'>{errors.firstName}</p>)}

                {/*This is Last Name on the form*/}
                <label htmlFor = 'lastName'>Last name</label>
                <Field type = 'text' name = 'lastName' />
                {touched.lastName && errors.lastName && (<p className = 'errors'>{errors.lastName}</p>)}

                {/*This is Email on the form*/}
                <label htmlFor = 'email'>E-mail</label>
                <Field type = 'email' name = 'email' onSubmit = {handleSubmit} />
                {touched.email && errors.email && (<p className = 'errors'>{errors.email}</p>)}

                {/*This is Password on the form*/}
                <label htmlFor = 'password'>Password</label>
                <Field type = 'password' name = 'password'  onSubmit = {handleSubmit} />
                {touched.password && errors.password && (<p className = 'errors'>{errors.password}</p>)}

                {/*This is Terms of Service on the form*/}
                <label htmlFor = 'terms'>
                    Terms of Service
                    <Field type = 'checkbox' name = 'ToS' />
                    {touched.ToS && errors.ToS && <p className = 'errors'>{errors.ToS}</p>}
                </label>

                {/*This is Register Button on the form*/}
                <div className = 'REPLACE'>
                    <button>Register</button>
                </div>
            </Form>

            {user.map(name => (
                <h2 key = {name.id}>{name.firstName} {name.lastName}</h2>
            ))}

        </div>
    )   
};


const FormikUserForm = withFormik ({
    mapPropsToValues({ firstName, lastName, email, password, ToS }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            password: '',
            ToS: ToS || false
        };
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().min(2, 'What are we in middle school. Full first name please.').max(31, 'I draw the line at Hatmaguptafratarinagarosterlous').required('Name is required.'),
        lastName: Yup.string().min(2, 'What are we in middle school. Full last name please.').max(31, 'I draw the line at Hatmaguptafratarinagarosterlous').required('Name is required.'),
        email: Yup.string().email().required('E-mail is required.'),
        password: Yup.string().min(6, 'Password must be over 6 characters.').required('Password is required'),
        ToS: Yup.bool().test('consent', 'You have to agree to the Terms and Conditions.', value => value === true).required('You have to agree to the Terms and Conditions.')
    }), 
    handleSubmit (values, { setStatus }) {
        console.log('Submitting', values);
        axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
        })
        .catch(err => console.err(err));
    }
})(UserForm);

export default FormikUserForm;