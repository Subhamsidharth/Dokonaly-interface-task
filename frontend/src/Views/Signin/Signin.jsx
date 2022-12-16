import React from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
            console.log(data)
    };
    console.log(watch("example"));
      return (
        <section className='registration-section'>
            <form onSubmit={handleSubmit(onSubmit)}>
             <h3>Login To App</h3>
            <label>Email</label>
            <input {...register("email", { required: true })} />
            {errors.email && <span className='error'>This field is required</span>}
            <label>Password</label>
            <input {...register("password", { required: true })} />
            {errors.password && <span className='error'>This field is required</span>}
            <button type="submit">submit</button>
            <div>New User, Please <NavLink to="/signup">Register</NavLink></div>
            </form>
        </section>
      )
}

export default Signin;
