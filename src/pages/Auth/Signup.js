import React from 'react'
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLocatilty, setAddressLocality] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressContry, setAddressCountry] = useState("");
  const [addressPostal, setAddressPostal] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      console.log("url login rev :",`${process.env.REACT_APP_SERVER_URL}/user/signup`)
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/signup`,{
      method: "POST",
      body : JSON.stringify({
          name : name,
          email : email,
          password: password,
          phone: phone,
          // user_type: "seller",
          // is_approved: false,
          address:{
              locality: addressLocatilty,
              city: addressCity,
              state: addressState,
              country: addressContry,
              postal_code: addressPostal
          }
        }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const contentType = res.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1){
      const user = await res.json();
      console.log(user);
      
      navigate('/login');
    }
    else{
      const text = await res.text();
      console.log(text);
    }
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <>
    <div className='container auth-div'>
    <div className='col-md-5 auth-box'>
    <h4 className='heading' style={{"color" : ""}}> Signup </h4>
    <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              //value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="SignUpName"
              placeholder="Name"
              //required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              //value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="SignUpEmail"
              placeholder="Email"
              //required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              //value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="SignUpPassword"
              placeholder="Password"
              //required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              //value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="SignUpPhone"
              placeholder="Phone Number"
              //required
            />
          </div>

          <div className="mt-3 Address">

            <label className="mb-3 fw-normal fs-6">Address</label>
            <div className="mb-3">
                <input
                type="text"
                //value={addressLocatilty}
                onChange={(e) => setAddressLocality(e.target.value)}
                className="form-control"
                id="Address-Locality"
                placeholder="Locality or Street"
                //required
                />
            </div>

            <div className="mb-3">
                <input
                type="text"
                //value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
                className="form-control"
                id="Address-City"
                placeholder="City"
                //required
                />
            </div>
            <div className="mb-3">
                <input
                type="text"
                //value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
                className="form-control"
                id="Address-State"
                placeholder="State"
                //required
                />
            </div>
            <div className="mb-3">
                <input
                type="text"
                //value={addressContry}
                onChange={(e) => setAddressCountry(e.target.value)}
                className="form-control"
                id="Address-Country"
                placeholder="Country"
                //required
                />
            </div>
            <div className="mb-3">
                <input
                type="text"
                //value={addressPostal}
                onChange={(e) => setAddressPostal(e.target.value)}
                className="form-control"
                id="Address-PostalCode"
                placeholder="Postal Code"
                //required
                />
            </div>

          </div>
          
          <button type="submit" className="btn btn btn-dark btn-submit btn-auth">
            Sign Up
          </button>
        </form>
    </div>
    </div>
    </>
  )
}

export default Signup