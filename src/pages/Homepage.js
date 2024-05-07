import {React, useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import Searchbar from '../components/Searchbar';
import { Link } from 'react-router-dom';


const Homepage = () => {

  const [prodData, setProdData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchProdInfo = async () => {
    console.log("url",`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/searchProduct`);
    try{
        console.log("inside");
        console.log(`Bearer ${process.env.REACT_APP_TOKEN}`)
    const res = await fetch(`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/searchProduct`,{
      method: "GET",
      headers: {
       "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
       "Content-type": "application/json; charset=UTF-8"
      },
      credentials: 'include'
    });
    console.log(res);

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
  const handleAddtoWishlist = async (productId,platformId) => { 
    console.log("id",user._id);
    try{
      console.log("blahhh")
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/addwishlist`,{
      method: "PUT",
      body: JSON.stringify({
        UserId: user._id,
        platformId: platformId,
        productId: productId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      credentials: 'include'
    })

    const contentType = res.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1){
      const res = await res.json();
      console.log(res);
    }
    else{
      const text = await res.text();
      console.log(text);
    }
    }catch(err){
      console.log(err);
    }
  }

  const handleAddtoCart = async (productId,platformId) => {
    try{
      console.log("blahhh")
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/addcart`,{
      method: "PUT",
      body: JSON.stringify({
        UserId: user._id,
        platformId: platformId,
        productId: productId
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

  return (
    <>
    <Searchbar/>
    <Layout>
    
    <div className='container nav-sear-div'>
      
    <h4 className='heading'> Shop </h4>
    
    <div className='d-flex flex-wrap justify-content-start'>
        {prodData?.map((prodObj)=>{
            console.log("here ", prodObj.name, prodObj.images);
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
                <span className='card-price'>Rs. {prodObj.price} </span> <span className='card-left'>{prodObj.quantity} left</span>
              </p>
            </div>
            </Link>
            <div className="card-body">
              <a href="#" className="card-link">
               <button type="button" className="btn btn-outline-dark" style={{"font-size":"13px"}} onClick={(e)=>{
                e.preventDefault();
                handleAddtoWishlist(prodObj._id,prodObj.platformId)}}> <i className="fa-regular fa-heart fa-sm" /> WishList</button>
              </a>
              <a href="#" className="card-link">
               <button type="button" className="btn btn-dark" style={{"font-size":"13px"}} onClick={(e)=>{
                e.preventDefault();
                handleAddtoCart(prodObj._id,prodObj.platformId)}}>  <i className="fa-solid fa-bag-shopping fa-sm" /> Add to Cart</button>
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

export default Homepage