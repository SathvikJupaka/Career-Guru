import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import "./index.css";

function UserNavbar(){
    const [menuOpen,setMenuOpen]=useState(false);
    const navigate=useNavigate();

    const onClickLogOut=()=>{
        Cookies.remove("user_jwt_token");
        localStorage.removeItem("userInfo");
        navigate("/",{replace:true});
    }

    return (
        <div className="user-nav-bar-container">
            <div className="desktop-nav">
                <div className="company-logo-container">
                    <Link to={"/user/home"}><img alt="company-logo" src={Logo}  className="company-logo"/></Link>
                </div>
                <div className="user-options-container">
                    <div className="large-screen-options">
                        <ul className="options-container">
                            <Link to={"/user/alljobs"}><li className="option">AllJobs</li></Link>
                            <Link to={"/user/appliedjobs"}><li className="option">Applied</li></Link>
                            <Link to={"/user/updateUserProfile"}><li className="option">updateProfile</li></Link>
                        </ul>
                        <button type="button" className="logout-button" onClick={onClickLogOut}>Logout</button>
                    </div>
                    <div className="mobile-hamburger-icon-container">
                        <button className="hamburger-icon-mobile" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <IoIosCloseCircleOutline />:<GiHamburgerMenu />}</button>
                    </div>
                </div>
            </div>
            {menuOpen && <div className="mobile-options">
                <ul className="options-container">
                    <Link to={"/user/alljobs"}><li className="option">AllJobs</li></Link>
                    <Link to={"/user/appliedjobs"}><li className="option">Applied</li></Link>
                    <Link to={"/user/updateUserProfile"}><li className="option">updateProfile</li></Link>
                </ul>
                <button type="button" className="logout-button" onClick={onClickLogOut}>Logout</button>
            </div>}
        </div>
    )
}

export default UserNavbar;