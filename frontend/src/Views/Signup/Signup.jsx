import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { NavLink , useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useHttpClient } from "../../hook/http-hook";
import {  toast } from 'react-toastify';
import "./Signup.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, apiCall } = useHttpClient();
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const fileRef = useRef();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    if (data.password === data.retypePassword) {
      const formData = new FormData();
      formData.append('firstName',data.firstName);
      formData.append('lastName',data.lastName);
      formData.append('email',data.email);
      formData.append('password',data.password);
      formData.append("files",profileImg);
      
      try {
        const response = await apiCall(
          "http://localhost:4000/register",
          "POST",
          formData,
          // {
          //   "Content-Type": "application/json",
          // }
        );
        console.log(response,"response")
        if(response.status){
          toast.success(response.message);
         navigate('/signin')
        }else{
          toast.error(response.message)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("password is mismatch, please check it");
    }
  };

  const profilePickHandler = () => {
    fileRef.current.click();
    console.log("clicked");
  };

  const fileSelectHandler = (e) => {
    setProfileImg(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setProfileImgUrl(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section className="registration-section">
      {isLoading ? (
        <Loader />
      ) : (
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Register To App</h3>
          <label>Firstname</label>
          <input {...register("firstName", { required: true })} />
          {errors.firstName && (
            <span className="error">This field is required</span>
          )}
          <label>Lastname</label>
          <input {...register("lastName", { required: true })} />
          {errors.lastName && (
            <span className="error">This field is required</span>
          )}
          <label>Email</label>
          <input  {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i })} />
          {errors.email && (
            <span className="error">please enter valid email</span>
          )}
          <label>Password</label>
          <input {...register("password", { required: true, min:6, max:15 })} />
          {errors.password && (
            <span className="error">minimum 6 chars required</span>
          )}
          <label>Confirm Password</label>
          <input
            className="retype"
            {...register("retypePassword", { required: true, min:6, max:15 })}
          />
          {errors.retypePassword && (
            <span className="error">minimum 6 chars required</span>
          )}
          <label>Select Profile Pic</label>
          <div className="preview-container">
            {profileImgUrl ? (
              <img
                src={profileImgUrl}
                alt="preview-img"
                className="preview-image"
              />
            ) : (
              "Please Pick a Image"
            )}
          </div>
          <input
            className="fileInput"
            type="file"
            onChange={fileSelectHandler}
            accept=".png, .jpg, .jpeg"
            ref={fileRef}
          />
          <button
            type="button"
            className="file-button"
            onClick={profilePickHandler}
          >
            Select a Pic
          </button>
          <button className="btn" type="submit">Submit</button>
          <div style={{textAlign:"center"}}>
            Already You have Accont  , <NavLink to="/signin">Login</NavLink>
          </div>
          <div style={{textAlign:"center"}}>Forgot your Password? <NavLink to="#">Click Here to Reset</NavLink></div>
        </form>
      )}
    </section>
  );
};

export default Signup;
