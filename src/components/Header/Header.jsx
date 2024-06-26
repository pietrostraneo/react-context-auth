import styleHeader from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";
import checkLogin from '../../middleware/checkLogin';
import { MdArrowLeft, MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';

export default function Header() {
    const loginStatus = checkLogin();
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData)

    const [drop, setDrop] = useState(false);

    const handleDropdown = () => {
        setDrop(() => {
            return !drop;
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-between text-white align-items-center">

                    <div className="logo">
                        <img src="/logo.png" alt="" className={`img-fluid ${styleHeader.jumbo_img}`} />
                    </div>

                    <div className="nav d-flex gap-4 align-items-center">
                        <ul className="list-unstyled d-flex gap-5 justify-content-center align-items-center">
                            <li><NavLink to="/" className='text-white text-decoration-none'>Home</NavLink></li>
                            <li><NavLink to="/latest" className='text-white text-decoration-none'>Latest</NavLink></li>
                            <li><NavLink to="/contacts" className='text-white text-decoration-none'>Contacts</NavLink></li>
                            <li><NavLink to="/about" className='text-white text-decoration-none'>About us</NavLink></li>
                        </ul>
                        <ul className="list-unstyled d-flex gap-2 justify-content-center align-items-center">
                            <li><i className={`fas fa-magnifying-glass ${styleHeader.buttons}`}></i></li>
                            <li><Link to="/saved" className='text-white text-decoration-none'><i className={`fas fa-bookmark ${styleHeader.buttons}`}></i></Link></li>
                            {loginStatus ? (<>
                                <li><Link to="/create" className='text-white text-decoration-none'><i className={`fas fa-plus ${styleHeader.buttons}`}></i></Link></li>
                                <li className='position-relative'>
                                    <img src={user.image || 'https://i.pravatar.cc/300'} alt={user.username} className={`img-fluid ${styleHeader.profile_pic}`} onClick={() => {
                                        handleDropdown()
                                    }} />
                                    {drop ? (<>
                                        <MdArrowDropDown className='fs-3' />
                                        <Dropdown />

                                    </>
                                    ) : (<MdArrowLeft className='fs-3' />)}

                                </li>
                            </>) : (<>

                                <li><Link to="/login" className='text-white text-decoration-none'><i className={`fas fa-user ${styleHeader.buttons}`}></i></Link></li>
                            </>)}
                        </ul>
                    </div >
                </div>
            </div>

        </div >

    )
}