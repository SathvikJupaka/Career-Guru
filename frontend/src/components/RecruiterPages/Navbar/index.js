import Logo from "../../../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"

function Navbar(){
    const [menuOpen,setMenuOpen]=useState(false);
    const navigate=useNavigate();

    const onClickLogOut=()=>{
        Cookies.remove("recruiter_jwt_token");
        localStorage.removeItem("recruiterInfo");
        navigate("/",{replace:true});
    }

    return (
        <div className="recruiter-nav-bar-container">
            <div className="desktop-nav">
                <div className="company-logo-container">
                    <Link to={"/recruiter/home"}><img alt="company-logo" src={Logo}  className="company-logo"/></Link>
                </div>
                <div className="recruiter-options-container">
                    <div className="large-screen-options">
                        <ul className="recruiteroptions-container">
                            <Link to={"/recruiter/myjobs"}><li className="option">myJobs</li></Link>
                            <Link to={"/recruiter/postjob"}><li className="option">postJob</li></Link>
                        </ul>
                        <button type="button" className="logout-button" onClick={onClickLogOut}>Logout</button>
                    </div>
                    <div className="mobile-hamburger-icon-container">
                        <button className="hamburger-icon-mobile" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <IoIosCloseCircleOutline />:<GiHamburgerMenu />}</button>
                    </div>
                </div>
            </div>
            {menuOpen && <div className="mobile-options">
                <ul className="recruiteroptions-container">
                    <Link to={"/recruiter/myjobs"}><li className="option">myJobs</li></Link>
                    <Link to={"/recruiter/postjob"}><li className="option">postJob</li></Link>
                </ul>
                <button type="button" className="logout-button" onClick={onClickLogOut}>Logout</button>
            </div>}
        </div>
    )
}

export default Navbar;