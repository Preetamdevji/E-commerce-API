import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{

    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });

    const navigate = useNavigate();   

    const collectLoginData =async ()=>{
        // console.log(email,password);

        let result = await fetch('http://localhost:5000/login',{
            method : "Post",
            body : JSON.stringify({email,password}),
            headers : {
                'Content-Type' : 'application/json'
            },
        });
        result = await (result).json();
        // console.log(result);
        if(result.auth){
        localStorage.setItem('user', JSON.stringify(result.userResult));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/')
        }else{
           alert('Please Enter correct details')
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="InputBox" placeholder="Enter Email Address"
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>

            <input type="password" className="InputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>

            <button type="button" className="LoginButton" onClick={collectLoginData} >Login</button>
        </div>
    )
}

export default Login;