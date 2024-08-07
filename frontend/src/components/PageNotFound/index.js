import { Link } from 'react-router-dom'
import NotFoundImg from '../../assets/404.jpg'
import './index.css'

const PageNotFound = () =>{
    const userInfo=localStorage.getItem("userInfo");
    return (
        <div className="not-found-container">
            <img src={NotFoundImg} alt="not found" className='not-found-img' />
            <h1 className='not-found-text'>Page Not Found</h1>
            <p className='not-found-caption'>
                We are sorry, the page you requested could not be found.<br/>
                Please go back to the home page
            </p>
            {/* if page not found this link is to navigate to home page */}
            {userInfo?(
                <Link to="/user/home" replace={true}>
                    <button className='not-found-home-page-btn'>Home Page</button>
                </Link>
            ):(
            <Link to="/recruiter/home" replace={true}>
                <button className='not-found-home-page-btn'>Home Page</button>
            </Link>
            )}
        </div>
    )
}

export default PageNotFound