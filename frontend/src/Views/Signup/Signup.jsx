import React from 'react';
import { useForm } from "react-hook-form";
import {NavLink} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useHttpClient } from '../../hook/http-hook';
import './Signup.css';

const Signup = () => {
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const {isLoading,apiCall,errorMessage} = useHttpClient();
const onSubmit = (data) => {
    if(data.password === data.retypePassword){
        console.log(data)
    }else{
        alert("password is mismatch, please check it");
    }
    
};
console.log(watch("example"));
  return (
    <section className='registration-section'>
        {isLoading ? <Loader /> :
        <form onSubmit={handleSubmit(onSubmit)}>
         <h3>Register To App</h3>
         <label>Firstname</label>
         <input {...register("firstName", { required: true })} />
         {errors.lastName && <span className='error'>This field is required</span>}
        <label>Lastname</label>
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span className='error'>This field is required</span>}
        <label>Email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span className='error'>This field is required</span>}
        <label>Password</label>
        <input {...register("password", { required: true })} />
        {errors.password && <span className='error'>This field is required</span>}
        <input className='retype' placeholder='conform password' {...register("retypePassword", { required: true })} />
        {errors.retypePassword && <span className='error'>This field is required</span>}
        <button type="submit">submit</button>
        <div>Already You have Accont, <NavLink to="/signin">Login</NavLink></div>
        </form>}
    </section>
  )
}

export default Signup;
