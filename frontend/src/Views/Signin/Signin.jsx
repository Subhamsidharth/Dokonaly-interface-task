import React,{useEffect,useContext} from 'react';
import { useForm } from "react-hook-form";
import { NavLink , useNavigate} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useHttpClient } from "../../hook/http-hook";
import '../Signup/Signup.css';
import {  toast } from 'react-toastify';
import { AuthContext } from '../../context/auth-context';
// import { userLogin } from '../../redux/authActions';
// import {useSelector,useDispatch} from 'react-redux';

const Signin = () => {
  const auth = useContext(AuthContext)
    const { register, handleSubmit,  formState: { errors } } = useForm();
    // const {loading,userInfo,error} = useSelector(state => state.auth);
    // const dispatch = useDispatch()
    const { isLoading, apiCall } = useHttpClient();
    const navigate = useNavigate();
    // useEffect(() => {
    //   if (userInfo) {
    //     navigate('/userprofile')
    //   }
    // }, [navigate, userInfo])
    const onSubmit = async (data) => {
      // dispatch(userLogin(data))
        try {
          const response = await apiCall(
            "http://localhost:4000/login",
            "POST",
            JSON.stringify(data),
            {
              "Content-Type": "application/json",
            }
          );
          if(response.status){
            toast.success(response.message);
            auth.login(response.data.userId,response.data.token);
            
            // localStorage.setItem("token",response.data.token);
            // localStorage.setItem("userid",response.data.userId);
           navigate('/userprofile');
          }else{
            toast.error(response.message)
          }
        } catch (err) {
          console.log(err);
        }
      
    };

    // if(error){
    //   toast.error = error;
    // }

      return (
        <section className='registration-section'>
          {isLoading ? <Loader /> : <form  className="registration-form" onSubmit={handleSubmit(onSubmit)}>
             <h3>Login To App</h3>
            <label>Email</label>
            <input {...register("email", { required: true,  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i  })} />
            {errors.email && <span className='error'>Please enter valid email</span>}
            <label>Password</label>
            <input {...register("password", { required: true, min:6, max:15 })} />
            {errors.password && <span className='error'>minimun 6 chars required</span>}
            <button  className="btn" type="submit">submit</button>
            <div style={{textAlign:"center"}}>Don't have account? <NavLink to="/signup">Create an Account</NavLink></div>
            <div style={{textAlign:"center"}}>Forgot your Password? <NavLink to="#">Click Here to Reset</NavLink></div>
            </form>}
        </section>
      )
}

export default Signin;
