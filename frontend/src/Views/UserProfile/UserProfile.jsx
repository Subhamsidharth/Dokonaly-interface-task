import React, { useEffect, useState, useContext } from "react";
import "./UserProfile.css";
import Card from "react-bootstrap/Card";
import { useHttpClient } from "../../hook/http-hook";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const { apiCall } = useHttpClient();
  const [user, setUser] = useState("null");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register:register2,
    handleSubmit:handleSubmit2,
    formState: { errors:errors2 },
  } = useForm();

  const url = "//localhost:4000/user/" + auth.userId;

  const getUser = async () => {
    try {
      const response = await apiCall(url, "GET", null, {
        Authorization: "Bearer " + auth.token,
      });
      if (response.status) {
        toast.success(response.message);
        setUser(response.data);
      } else {
        toast.err(response.message);
      }
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await apiCall(url, "PUT", JSON.stringify(data), {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      });
      if (response.status) {
        console.log(response.Data)
        toast.success(response.message);
        setUser(response.Data);
        // navigate('/userprofile')
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changePasswordHandler = async(data) => {
    console.log(data,"data")
  }

  useEffect(() => {
    if (auth.token) {
      getUser();
    }
  }, []);

  console.log(user, "user details");
  return (
    <div className="userprofile">
      <div className="userprofile-section">
        <Card>
          <Card.Header>
            <ul className="nav nav-tabs">
              <li className="active tab-header-button">
                <button href="#1" data-toggle="tab">
                  Overview
                </button>
              </li>
              <li className="tab-header-button">
                <button href="#2" data-toggle="tab">
                  Edit Profile
                </button>
              </li>
              <li className="tab-header-button">
                <button href="#3" data-toggle="tab">
                  Change Password
                </button>
              </li>
            </ul>
          </Card.Header>
          <Card.Body>
            <div id="exTab2" className="container">
              <div className="tab-content ">
                <div className="tab-pane active" id="1">
                  {!user ? (
                    "user not found"
                  ) : (
                    <div className="card-body">
                      <div>
                        <div className="flex-container">
                          <label>firstName</label>
                          <p>{user.firstName}</p>
                        </div>
                        <div className="flex-container">
                          <label>lastName</label>
                          <p>{user.lastName}</p>
                        </div>
                        <div className="flex-container">
                          <label>email</label>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div>
                        {user && (
                          <img
                            height="100px"
                            width="auto"
                            src={user.profileImage}
                            alt="profile"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="tab-pane" id="2">
                  {!user ? (
                    "user not found"
                  ) : (
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex-container">
                          <label>firstName</label>
                          <div>
                          <input
                            {...register("firstName", { required: true })}
                            // defaultValue={user.firstName}
                            type="text"
                          />
                          {errors.firstName && (
                            <span className="error">
                              This field is required
                            </span>
                          )}
                          </div>
                        </div>
                        <div className="flex-container">
                          <label>lastName</label>
                          <div>
                          <input
                            {...register("lastName", { required: true })}
                            // defaultValue={user.lastName}
                            type="text"
                          />
                          {errors.lastName && (
                            <span className="error">
                              This field is required
                            </span>
                         
                          )}
                             </div>
                        </div>
                        <button className="tab-button" type="submit">
                          Save
                        </button>
                      </form>
                    </div>
                  )}
                </div>
                <div className="tab-pane" id="3">
                  {!user ? (
                    "user not found"
                  ) : (
                    <div>
                      <form onSubmit={handleSubmit2(changePasswordHandler)}>
                      <div className="flex-container">
                        <label>Current Password</label>
                        <div>
                        <input  {...register2("currentPassword", { required: true, min:6 })}  type="text" />
                        {errors2.currentPassword && (
                            <span className="error">
                              minimum 6 chars required
                            </span>
                         
                          )}
                          </div>
                      </div>
                      <div className="flex-container">
                        <label>New Password</label>
                        <div>
                        <input  {...register2("newPassword", { required: true, min:6 })} type="text" />
                        {errors2.newPassword && (
                            <span className="error">
                              minimum 6 chars required
                            </span>
                         
                          )}
                          </div>
                      </div>
                      <div className="flex-container">
                        <label>Confirm Password</label>
                        <div>
                        <input  {...register2("confirmPassword", { required: true, min:6 })} type="text" />
                      
                      {errors2.currentPassword && (
                            <span className="error">
                              minimum 6 chars required
                            </span>
                         
                          )}
                          </div>
                          </div>
                      <button className="tab-button" type="submit">
                        Update Password
                      </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
