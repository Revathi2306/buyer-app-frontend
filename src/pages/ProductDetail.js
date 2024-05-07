import {React, useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import {useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {

    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user" , user);
    const [mainImgUrl, setMainUrl] = useState("");
    const stateObj  = (location.state) || {};
    console.log("uubu", location.state);
    const navigate = useNavigate();

    const [prodData, setProdData] = useState({});
  
    const fetchProdInfo = async () => {
      console.log("url",`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/${stateObj.platformId}/${stateObj.productId}`);
      try{
          console.log("inside");
          console.log(`Bearer ${process.env.REACT_APP_TOKEN}`)
          const res = await fetch(`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/${stateObj.platformId}/${stateObj.productId}`,{
              method: "GET",
              headers: {
              "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
              "Content-type": "application/json; charset=UTF-8"
              },
              credentials: 'include'
          })
          .then(res => res.json())
          .then(proddata => {
            setProdData(proddata);
            setMainUrl(proddata.images?proddata.images[0]:"")
          })
          
          console.log("prod:",prodData);
      
        }catch(err){
          console.log("catch err",err);
        }
    };
    
    useEffect(() => {
      fetchProdInfo();
    }, []);

    const handleAddtoWishlist = async (productId,platformId) => {
        try{
          console.log("blahhh")
          const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/addwishlist`,{
          method: "PUT",
          body: JSON.stringify({
            UserId: user._id,
            platformId: stateObj.platformId,
            productId: stateObj.productId
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
          navigate('/wishlist')
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
        console.log("blahhh", `${process.env.REACT_APP_SERVER_URL}/user/addcart`)
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/addcart`,{
        method: "PUT",
        body: JSON.stringify({
          UserId: user._id,
          platformId: stateObj.platformId,
          productId: stateObj.productId
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
        navigate('/cart')
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
    <Layout>
    
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
    <div className="row justify-content-start nav-div">

    {/* image gallery */}
    <div className="col-md-6">

        <div className="item-image-parent">
            <div className="item-list-vertical">
            {prodData.images?.map((imgurl) => {
                return(
                <div className="thumb-box" onClick={(e)=>{
                  e.preventDefault();
                  setMainUrl(imgurl);
                }}>
                <img src={imgurl} alt="prod" />
                </div>
            );})}
            
            </div>
            
            <div className="item-image-main">
              {console.log("main url ret", mainImgUrl)}
            <img src={mainImgUrl} alt="default" />
            </div>
        </div>

        {/* /image gallery  */}
    </div>

    {/* description  */}

    <div className="col-md-4">
        <h2 className="pt-3 fs-3 lg:pt-0" style={{"font-weight": "1000"}}>
        {prodData.name}
        </h2>

        <p className="pt-5 ">
        {prodData.description}
        </p>
 
        <p className="mt-4 fw-medium fs-4">
             ₹ {prodData.price}
        </p>
        
        <p className="mt-4" style={{"color": "#FA7406"}}>
             {prodData.quantity} left
        </p>
        
        <button type="button" className="btn btn-dark prod-btn" 
        onClick={()=>{handleAddtoCart(prodData._id,prodData.platformId)}}>  
        <i className="fa-solid fa-bag-shopping fa-sm" />  Add to Cart</button>

        <button type="button" className="btn btn-outline-dark prod-btn"
        onClick={()=>{handleAddtoWishlist(prodData._id,prodData.platformId)}}> 
        <i className="fa-regular fa-heart fa-sm" /> WishList</button>

    </div>
    </div>
    </section>
    </Layout>
    );
}

export default ProductDetail