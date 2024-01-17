import { clear } from "@testing-library/user-event/dist/clear";
import React from "react";
import { Link, json, useNavigate } from "react-router-dom";
const Nav=()=>{
    let navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = ()=>{
        localStorage.clear();
        navigate('/signUp');
    }
    return(
        <div>
              
              {  auth ? <ul className="nav-ul">
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='signUp' onClick={logout}>Logout ({JSON.parse(auth).userName})</Link></li>
            </ul>
               : <ul className="nav-ul menu-right">
                <li><Link to='/signUp'>Sign Up</Link></li>
                <li><Link to='/login'>Login</Link></li>
               </ul>     
    
    }
        </div>
    )
}

export default Nav;


