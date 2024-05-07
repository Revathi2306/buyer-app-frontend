import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
    try{  
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/logout`,{
            method: "POST",
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'include'
        });
        const msg = await res.text();
        console.log(msg);
    
        localStorage.clear();
        navigate('/login');
    
    }catch(err){
        console.log("catch err",err);
    }}

    useEffect(() => {
        handleLogout();
      }, []);

    // return(<h1>logged out</h1>)
}

export default Logout