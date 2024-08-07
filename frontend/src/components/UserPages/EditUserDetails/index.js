import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../UserNavbar";
import { useForm } from "react-hook-form";
import "./index.css";
import { toast } from 'react-toastify';

function EditUserDetails() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate=useNavigate();
  const [filee,setFile]=useState(null);

  const fileUpload=async ()=>{
    const data=new FormData();
    data.append("file",filee);
    data.append("upload_preset","dj5tzyxw");
    data.append("cloud_name", "dqwdin9cy");

    try{
      const url = `https://api.cloudinary.com/v1_1/dqwdin9cy/raw/upload`;
      const response=await fetch(url,{
        method: "post",
        body: data,
      })
      const responseData = await response.json(); 
      return responseData.secure_url;
;
    }
    catch(error){
      console.log(error);
    }
  }

  
  const handleFormSubmit = async (data) => {
    const resumeUrl=await fileUpload();

    const updateDetails = {
      name: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      skills: data.skills,
      educationDetails: data.educationDetails,
      resumeUrl
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo.username=data.fullName;
    userInfo.email=data.email;
    localStorage.setItem("userInfo",JSON.stringify(userInfo));
    const userId = userInfo ? userInfo.userId : null;
    const url = `/user-api/updateProfile/${userId}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(updateDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      toast.success('Details updated successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastStyle: { width: '400px' } // Adjust the width value as needed
      });


      
      navigate("/user/home");
      reset();
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error('Failed to update user details', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastStyle: { width: '400px' } // Adjust the width value as needed
      });
    }
  };
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo ? userInfo.userId : null;
        const url = `/user-api/user-details/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Set form values with user details
        if (data && data.user) {
          const { username, email, phoneNumber, address, skills, educationDetails } = data.user;
          setValue("fullName", username);
          setValue("email", email);
          setValue("phoneNumber", phoneNumber);
          setValue("address", address);
          setValue("skills", skills);
          setValue("educationDetails", educationDetails);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [setValue,]);


  return (
    <div className="edit-user-details-page">
      <UserNavbar />
      <div className="edit-user-details-container">
        <form
          className="edit-user-details-form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label className="edit-user-details-label">
            Full Name:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("fullName")}
            />
          </label>

          <label className="edit-user-details-label">
            Email:
            <input
              className="edit-user-details-input"
              type="email"
              {...register("email")}
            />
          </label>

          <label className="edit-user-details-label">
            Phone Number:
            <input
              className="edit-user-details-input"
              type="tel"
              {...register("phoneNumber")}
            />
          </label>

          <label className="edit-user-details-label">
            Address:
            <input
              className="edit-user-details-input"
              {...register("address")}
            />
          </label>

          <label className="edit-user-details-label">
            Skills:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("skills")}
            />
          </label>

          <label className="edit-user-details-label">
            Education Details:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("educationDetails")}
            />
          </label>

          <label className="edit-user-details-label">
            Resume (PDF):
            <input
              className="edit-user-details-input"
              type="file"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </label>

          <button className="edit-user-details-button" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserDetails;
