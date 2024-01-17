import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const SignUp=()=>{
        const [userName,setuserName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const navigate = useNavigate();

        useEffect(()=>{
            const auth = localStorage.getItem('user');
            if (auth){
                navigate('/')
            }
        })

        const collectData = async()=>{
        //    console.log(userName,email,password);
            let result = await fetch("http://localhost:5000/register",{
            method : 'Post',
            body : JSON.stringify({userName,email,password}),
            headers : {
                'Content-Type' : 'application/json'
            },
        });

        result = await (result).json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.data));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert('Please Enter correct details')
        }  
    };
    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" className="InputBox" placeholder="Enter User Name" onChange={(e)=>setuserName(e.target.value)} value={userName} ></input>

            <input type="email" className="InputBox" placeholder="Enter Email Address" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            
            <input type="password" className="InputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <button type="button" className="signUpButton" onClick={collectData}> SignUp </button>
        </div>
    )
}

export default SignUp;