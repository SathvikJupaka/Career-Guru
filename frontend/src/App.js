import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserLogin from "./components/LoginPage"
import UserRegister from "./components/RegistrationPage"
import UserHome from "./components/UserPages/UserHome"
import PageNotFound from "./components/PageNotFound";
import UserProtectedRoutes from "./components/UserProtectedRoutes"
import RecruiterProtectedRoutes from "./components/RecruiterProtectedRoutes"
import RecruiterHome from "./components/RecruiterPages/Home";
import MyJobs from "./components/RecruiterPages/MyJobs";
import PostJob from "./components/RecruiterPages/PostJob";
import Applications from "./components/RecruiterPages/Applications";
import AllJobs from "./components/UserPages/AllJobs";
import AppliedJobs from "./components/UserPages/AppliedJobs";
import EditUserDetails from "./components/UserPages/EditUserDetails";
// import HomePage from "./components/HomePage";
import "react-toastify/dist/ReactToastify.css";
  import {ToastContainer ,Bounce} from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer transition={Bounce}/>
      <Routes>
        {/* PUBLIC ROUTES */}
        {/* <Route exact path="/" element={<HomePage />} /> */}
        <Route exact path="/" element={<UserLogin />} />
        <Route exact path="/register" element={<UserRegister />} />
        {/* RECRUITER PROTECTED ROUTES */}
        <Route path="/recruiter/*" element={<RecruiterProtectedRoutes />}>
          <Route exact path="home" element={<RecruiterHome />} />
          <Route exact path="myjobs" element={<MyJobs />} />
          <Route exact path="postjob" element={<PostJob />} />
          <Route exact path="applications/:jobId" element={<Applications />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* USER PROTECTED ROUTES */}
        <Route path="/user/*" element={<UserProtectedRoutes />}>
          <Route exact path="home" element={<UserHome />} />
          <Route exact path="alljobs" element={<AllJobs />} />
          <Route exact path="appliedjobs" element={<AppliedJobs />} />
          <Route exact path="updateUserProfile" element={<EditUserDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      </BrowserRouter>  
    </>
    
  );
}

export default App;
