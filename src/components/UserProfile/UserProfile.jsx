import { Link, NavLink, useLocation } from "react-router-dom";
import styleProfile from './UserProfile.module.scss'

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>

            <div className="container">
                <div className="row mt-5 justify-content-center text-white">

                    <div className="col-md-8 col-12 mb-3">
                        <h2>Your Profile</h2>
                    </div>

                    <div className="col-md-8 col-12 mb-5">
                        <nav className={`${styleProfile.navbar} px-4`}>
                            <ul className={`list-unstyled d-flex gap-5`}>
                                <li><NavLink to="">Bio</NavLink></li>
                                <li><NavLink to="">Posts</NavLink></li>
                                <li><NavLink to="">Settings</NavLink></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-8 col-12">

                        <div className={`${styleProfile.user_info} d-flex gap-4`}>
                            <div>
                                <img src={user.image ? user.image : 'https://i.pravatar.cc/1000'} alt={user.username} className="img-fluid" />
                            </div>
                            <div>
                                <h3 className=" text-capitalize">{user.username}</h3>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}