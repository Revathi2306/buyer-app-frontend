import {React, useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import Searchbar from '../components/Searchbar';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [prodData, setProdData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
  
    const fetchProdInfo = async () => {
      console.log("url",`${process.env.REACT_APP_SERVER_URL}/user/wishlist`);
      try{
          console.log("inside");
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/wishlist`,{
        method: "GET",
        headers: {
         "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
         "Content-type": "application/json; charset=UTF-8"
        },
        credentials: 'include'
      });
      console.log("resp",res);
  
      const proddata = await res.json();
      setProdData(proddata);
      console.log("prods:",proddata);
  
      }catch(err){
        console.log("catch err",err);
      }
    };
  
    useEffect(() => {
      fetchProdInfo();
    }, []);


    const handleAddtoCart = async (productId,platformId) => {
        try{
          console.log("blahhh")
          const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/addcart`,{
          method: "PUT",
          body: JSON.stringify({
            UserId: user._id,
            platformId:platformId,
            productId:productId
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          credentials: 'include'
        })
    
        const contentType = res.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1){
          const user = await res.json();
          console.log(user);
        }
        else{
          const text = await res.text();
          console.log(text);
        }
        }catch(err){
          console.log(err);
        }
    }

    const handleremoveFromWishlist = async (productId,platformId) =>{
        try{
            console.log("blahhh")
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/removewishlist`,{
            method: "PUT",
            body: JSON.stringify({
              UserId: user._id,
              platformId:platformId,
              productId:productId
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'include'
          })
      
          const contentType = res.headers.get("content-type")
          if (contentType && contentType.indexOf("application/json") !== -1){
            const response = await res.json();
            console.log(response);
            setProdData(prodData.filter(obj => obj._id !== productId));
          }
          else{
            const text = await res.text();
            console.log(text);
          }
          }catch(err){
            console.log(err);
          }
    }
    
  return (
    <>
    <Searchbar/>
    <Layout>

    
    <div className='container nav-sear-div'>
      <h4 className='heading'> WishList </h4>

    <div className='container d-flex flex-wrap'>
        {prodData?.map((prodObj)=>{
            return(
            <div className="card" style={{ width: "18rem" }}>
            <Link to='/product' state={{platformId: prodObj.platformId, productId:prodObj._id}} style={{textDecoration:'none'}}>
            <img className="card-img-top" src={prodObj.images?prodObj.images[0]:""} alt="Prod img" />
            <div className="card-body">
              <h5 className="card-title card-text">{prodObj.name}</h5>
              <p className="card-text">
                {prodObj.description}
              </p>
              <p className="card-text">
                ₹{prodObj.price} left:{prodObj.quantity}
              </p>
            </div>
            </Link>

            <div className="card-body">
              <a href="#" className="card-link">
               <button type="button" className="btn btn-outline-dark" onClick={(e)=>{
                e.preventDefault();
                handleremoveFromWishlist(prodObj._id,prodObj.platformId)}}>Remove</button>
              </a>
              <a href="#" className="card-link">
               <button type="button" className="btn btn-dark" onClick={(e)=>{
                e.preventDefault();
                handleAddtoCart(prodObj._id,prodObj.platformId)}}>Add to Cart</button>
              </a>
            </div>
          </div>
        )})}
    </div>
    </div>
    </Layout>
    </>
  )
}

export default Wishlist