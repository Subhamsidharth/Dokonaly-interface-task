import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useHttpClient } from "../../hook/http-hook";
import "./Signup.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, apiCall, errorMessage } = useHttpClient();
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const fileRef = useRef();
  const onSubmit = async (data) => {
    if (data.password === data.retypePassword) {
      data.profileImage = profileImg;
      console.log(data,"user data")
      try {
        const response = await apiCall(
          "//localhost:4000/register",
          "POST",
          JSON.stringify(data),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("password is mismatch, please check it");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Register To App</h3>
          <label>Firstname</label>
          <input {...register("firstName", { required: true })} />
          {errors.lastName && (
            <span className="error">This field is required</span>
          )}
          <label>Lastname</label>
          <input {...register("lastName", { required: true })} />
          {errors.lastName && (
            <span className="error">This field is required</span>
          )}
          <label>Email</label>
          <input {...register("email", { required: true })} />
          {errors.email && (
            <span className="error">This field is required</span>
          )}
          <label>Password</label>
          <input {...register("password", { required: true })} />
          {errors.password && (
            <span className="error">This field is required</span>
          )}
          <input
            className="retype"
            placeholder="conform password"
            {...register("retypePassword", { required: true })}
          />
          {errors.retypePassword && (
            <span className="error">This field is required</span>
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
            select
          </button>
          <button type="submit">submit</button>
          <div>
            Already You have Accont, <NavLink to="/signin">Login</NavLink>
          </div>
        </form>
      )}
    </section>
  );
};

export default Signup;
