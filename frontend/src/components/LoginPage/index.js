import React, { useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
  import { toast } from 'react-toastify';

import logo from "../../assets/logo.png";
import LoginImage from "../../assets/loginpageimagee.jpg";
import "./index.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState(""); 
  const navigate=useNavigate();

  useEffect(() => {
    const userToken = Cookies.get('user_jwt_token');
    const recruiterToken = Cookies.get('recruiter_jwt_token');

    if (userToken ) {
      navigate("/user/home", { replace: true });
    }
    if (recruiterToken) {
      navigate("/recruiter/home", { replace: true });
    }
  }, [navigate]);


  const onSubmit = async  (dat) => {
    const user=dat;
    console.log(user);
    if(user.userType==="JobSeeker"){
      const userData={
        username:user.username,
        email:user.email,
        password:user.password
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const userRegisterUrl="/user-api/login";
      try {
        const response = await fetch(userRegisterUrl, options);
      
        if (!response.ok) {
          throw new Error("Failed to login user. Please try again later.");
        }
        if(response.status===200){
          const data = await response.json();
          console.log(data);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          Cookies.set('user_jwt_token', data.token, { expires: 30 });
          toast.success('Login successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/user/home",{replace:true})
          setErrorMsg("");
        }
        else if(response.status===201){
          throw new Error("User with this email does not exist!");
        }
        else if(response.status===202){
          throw new Error("Invalid password!!");
        }
        else{
          throw new Error("server down right now!!");
        }
      } catch (error) {
        // setErrorMsg(error.message);
        toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
  
    }
    else if(user.userType==="Recruiter"){
      const userData={
        username:user.username,
        email:user.email,
        password:user.password,
        companyName:user.companyName,
        companyImageUrl:user.companyImageUrl
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const recruiterRegisterUrl="/recruiter-api/login";
      try {
        const response = await fetch(recruiterRegisterUrl, options);
      
        if (!response.ok) {
          throw new Error("Failed to login recruiter. Please try again later.");
        }
        if(response.status===200){
          const data = await response.json();
          // console.log(data);
          localStorage.setItem('recruiterInfo', JSON.stringify(data.recruiter));
          Cookies.set('recruiter_jwt_token', data.token, { expires: 30 });
          toast.success('Login successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/recruiter/home",{replace:true})
          setErrorMsg("");
        }
        else if(response.status===201){
          throw new Error("User with this email does not exist!");
        }
        else if(response.status===202){
          throw new Error("Invalid password!!");
        }
        else{
          throw new Error("server down right now!!");
        }
      } catch (error) {
        toast.error(error.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-page-content">
        <div className="login-page-image-container">
          <img
            alt="job"
            className="login-page-image"
            src={LoginImage}
          />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="website-logo-bar">
              <img className="website-logo" src={logo} alt="app-logo" />
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="email">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-element"
                {...register("email", { required: "*Email is required" })}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-element"
                {...register("password", { required: "*Password is required" })}
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="login-input-container ">
              <label className="user-register-label" htmlFor="user-type">
                USER-TYPE
              </label>
              <select {...register("userType", { 
                  required: "User type is required",
                  validate: value => value === "Recruiter" || value === "JobSeeker" || "*Please select a valid user type"
                })} className="types-list-container" defaultValue="DEFAULT">
                <option value="DEFAULT" disabled>
                  Choose an option
                </option>
                <option value="Recruiter">Recruiter</option>
                <option value="JobSeeker">Job Seeker</option>
              </select>
              {errors.userType && <p className="error-message">{errors.userType.message}</p>}

            </div>

            <div className="login-button-container">
              <button type="submit" className="login-button">
                Login
              </button>
              <p className="need-account">
                Need an account?{" "}
                <Link to={"/register"}>
                  <span className="go-to-register-link">
                    Register here
                  </span>
                </Link>
              </p>
            </div>
            {errorMsg!=="" && <p className="errormessage">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
