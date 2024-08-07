const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const expressAsyncHandler = require("express-async-handler");
const recruiterApp = express.Router();

const Recruiter = require("../models/Recruiter");
const Job=require("../models/Job");
const User=require("../models/User");
const AppliedJob=require("../models/AppliedJob");

//register api(public api)
recruiterApp.post("/register",expressAsyncHandler(async (request, response) => {
    const { username, email, password, companyName, companyImageUrl } = request.body;
    // console.log("came to recruiter register api")
    try {
      // Check if the recruiter with the same email already exists
      const existingRecruiter = await Recruiter.findOne({ email });

      if (existingRecruiter) {
        return response.status(200).send({ message: "Recruiter with the same email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 6);

      // Create a new recruiter instance
      const newRecruiter = new Recruiter({
        username,
        email,
        password: hashedPassword,
        companyName,
        companyImageUrl,
      });

      // Save the recruiter to the database
      await newRecruiter.save();

      // Send response
      response.status(201).send({ message: "Recruiter created successfully" });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  })
);

//login api(public api)
recruiterApp.post("/login", expressAsyncHandler(async (request, response) => {
  const { email, password } = request.body;

  try {
    // Find the recruiter by email
    const recruiter = await Recruiter.findOne({ email });
    // console.log(recruiter);

    // If recruiter doesn't exist, send an error message
    if (!recruiter) {
      return response.status(201).send({ message: "Invalid email" });
    }

    // Compare the passwords
    const isPasswordValid = await bcryptjs.compare(password, recruiter.password);

    // If passwords don't match, send an error message
    if (!isPasswordValid) {
      return response.status(202).send({ message: "Invalid password" });
    }

    // Create JWT token
    const signedJWTToken = jwt.sign({ email: recruiter.email, userType: "Recruiter" },
     "secret",
      { expiresIn: "1d" }
    );

    // Send token in response
    response.status(200).send({ message: "success", token: signedJWTToken, recruiter: {
      recruiterId: recruiter._id,
      username: recruiter.username,
      email: recruiter.email,
      userType: "Recruiter",
      companyName:recruiter.companyName,
      companyImageUrl:recruiter.companyImageUrl
    } });
  } catch (error) {
    response.status(500).send({ message: "Internal Server Error" });
  }
}));

// Update job details
recruiterApp.put("/updateJobDetails/:jobId", expressAsyncHandler(async (req, res) => {
  try {
    const jobId = req.params.jobId;
    // Find the job by ID
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

    // If job doesn't exist, return a 404 response
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send the updated job details in the response
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}));

//PROTECTED APIS
recruiterApp.post("/postjob",expressAsyncHandler(async (request, response) => {
    const {
      postedBy,
      companyName,
      companyImageUrl,
      positionName,
      jobType,
      lastDate,
      aboutJob,
      minQualifications,
      responsibilities,
      ctc,
      postedOn
    } = request.body;

    try {
      // Create a new job instance
      const newJob = new Job({
        postedBy,
        companyName,
        companyImageUrl,
        positionName,
        jobType,
        lastDate,
        aboutJob,
        minQualifications,
        responsibilities,
        postedOn,
        ctc,
      });

      // Save the job to the database
      await newJob.save();

      // Send response
      response.status(201).send({ message: "Job posted successfully" });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  })  
);


recruiterApp.get("/myjobs/:id",expressAsyncHandler(async (request, response) => {
    const recruiterId = request.params.id;
    const sortBy = request.query.sortBy || "latest";

    try {
      // Find all jobs posted by the specified recruiter
      let jobs;

      if (sortBy === "latest") {
        jobs = await Job.find({ postedBy: recruiterId }).sort({ postedOn: -1 });
      } else {
        jobs = await Job.find({ postedBy: recruiterId }).sort({ postedOn: 1 });
      } 

      // Send the list of jobs in the response
      response.status(200).send(jobs);
    } catch (error) {
      response.status(500).send({ message: "Internal Server Error" });
    }
  })
);


recruiterApp.delete("/deletejob/:jobId",expressAsyncHandler(async (request,response)=>{
  const jobId = request.params.jobId;

  try {
    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      // If the job with the given ID doesn't exist
      return response.status(404).send({ message: "Job not found" });
    }

    // Send success response
    response.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    response.status(500).send({ message: "Internal Server Error" });
  }
}))


recruiterApp.get("/job-applications/:jobId", expressAsyncHandler(async (request, response) => {
  const jobId = request.params.jobId;

  try {
    // Find the job details for the specified job
    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
      return response.status(404).send({ message: "Job not found" });
    }

    // Find all applications for the specified job
    const applications = await AppliedJob.find({ jobId });

    // Create an array to store user details along with application status
    const userDetails = [];

    // Fetch user details for each application
    for (const application of applications) {
      const user = await User.findById(application.userId);
      userDetails.push({
        userId: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        skills: user.skills,
        educationDetails: user.educationDetails,
        status: application.status,
        appliedOn: application.appliedOn,
        resume:user.resumeUrl,
      });
    }

    // Combine job details and user details
    const responseData = {
      jobDetails: {
        jobId: jobDetails._id,
        companyName: jobDetails.companyName,
        companyImageUrl: jobDetails.companyImageUrl,
        positionName: jobDetails.positionName,
        jobType: jobDetails.jobType,
        lastDate: jobDetails.lastDate,
        aboutJob: jobDetails.aboutJob,
        minQualifications: jobDetails.minQualifications,
        responsibilities: jobDetails.responsibilities,
        ctc: jobDetails.ctc,
        postedOn: jobDetails.postedOn,
      },
      userDetails,
    };

    // Send the combined details in the response
    response.status(200).send(responseData);
  } catch (error) {
    response.status(500).send({ message: "Internal Server Error" });
  }
}));


recruiterApp.put("/update-application-status", expressAsyncHandler(async (request, response) => {
  const { userId, jobId, status } = request.body;
  // console.log("request came");

  try {
    // Find the application for the specified user and job
    const application = await AppliedJob.findOne({ userId, jobId });

    if (!application) {
      return response.status(404).send({ message: "Application not found" });
    }

    // Update the application status
    application.status = status;

    // Save the updated application to the database
    await application.save();

    // Send success response
    response.status(200).send({ message: "Application status updated successfully" });
  } catch (error) {
    response.status(500).send({ message: "Internal Server Error" });
  }
}));

module.exports = recruiterApp;