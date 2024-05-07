import React from 'react'
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../components/layout/Layout';

const Profile = () => {

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
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/user-details`,{
      credentials: 'include'
    })

    const data = await res.json();
    setData(data);
    console.log("mee",data);

    setName(data.name);
    setEmail(data.email)
    setPassword(data.password)
    setPhone(data.phone)
    setAddressLocality(data.address.locality)
    setAddressCity(data.address.city)
    setAddressCountry(data.address.country)
    setAddressState(data.address.state)
    setAddressPostal(data.address.postal_code)

    }catch(err){
      console.log("catch err",err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try{
      console.log("url login rev :",`${process.env.REACT_APP_SERVER_URL}/user/update-details`)
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/update-details`,{
      method: "PUT",
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
      credentials: 'include',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const contentType = res.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1){
      const user = await res.json();
      console.log(user);
      
      navigate('/');
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
    
    <Layout>
    <div className='container nav-div' style={{"marginBottom" : "80px"}}>
    <div className='row col-md-8'>
    <h4 className='heading'> My Profile </h4>
    <form onSubmit={handleProfileSubmit} className='form-horizontal'>
      <h3 className='side-heading'>Personel Info</h3>
          <div className="mb-3 row">
            <label htmlFor="ProfileName" className=" profile-label col-md-2">
              Name 
            </label>
            <div class="col-md-10">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="ProfileName"
              placeholder="Name"
              //required
              autoFocus
              disabled
            />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="ProfileEmail" className=" profile-label col-md-2">
                Email
            </label>
            <div class="col-md-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="ProfileEmail"
              placeholder="Email"
              disabled
              //required
            />
            </div>
          </div>
          {/* <div className="mb-3 row">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="ProfilePassword"
              placeholder="Password"
              //required
            />
          </div> */}
          <div className="mb-3 row">
            <label htmlFor="ProfilePhone" className=" profile-label col-md-2">
                Phone
            </label>
            <div class="col-md-10">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="ProfilePhone"
              placeholder="Phone Number"
              //required
            />
            </div>
          </div>
      <h3 className='side-heading'>Address</h3>
          <div className="mt-3 Address">
            <div className="mb-3 row">
                <label htmlFor="Address-Locality" className=" profile-label col-md-2">
                    Locality
                </label>
                <div class="col-md-10">
                <input
                type="text"
                value={addressLocatilty}
                onChange={(e) => setAddressLocality(e.target.value)}
                className="form-control"
                id="Address-Locality"
                placeholder="Locality or Street"
                //required
                />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="Address-City" className=" profile-label col-md-2">
                   City
                </label>
                <div class="col-md-10">
                <input
                type="text"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
                className="form-control"
                id="Address-City"
                placeholder="City"
                //required
                />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="Address-State" className=" profile-label col-md-2">
                   State
                </label>
                <div class="col-md-10">
                <input
                type="text"
                value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
                className="form-control"
                id="Address-State"
                placeholder="State"
                //required
                />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="Address-Country" className=" profile-label col-md-2">
                  Country
                </label>
                <div class="col-md-10">
                <input
                type="text"
                value={addressContry}
                onChange={(e) => setAddressCountry(e.target.value)}
                className="form-control"
                id="Address-Country"
                placeholder="Country"
                //required
                />
                </div>
            </div>
            <div className="mb-5 row">
                <label htmlFor="Address-PostalCode" className=" profile-label col-md-2">
                  Postal Code
                </label>
                <div class="col-md-10">
                <input
                type="text"
                value={addressPostal}
                onChange={(e) => setAddressPostal(e.target.value)}
                className="form-control"
                id="Address-PostalCode"
                placeholder="Postal Code"
                //required
                />
                </div>
            </div>

          </div>
          <div className='profile-label'>
          <button type="submit" className="btn btn-dark btn-submit">
            Update Profile
          </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default Profile
