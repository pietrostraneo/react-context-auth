import styleDrop from './Dropdown.module.scss'
import { Link, NavLink } from "react-router-dom";

export default function Dropdown() {

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <>
            <div className={`${styleDrop.drop}`}>
                <ul>
                    <li><NavLink to="/profile"><button>Profile</button></NavLink></li>
                    <li><button onClick={() => {
                        handleLogout()
                    }}>Logout</button></li>
                </ul>
            </div>
        </>
    )
}