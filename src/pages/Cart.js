import {React, useState, useEffect, useMemo} from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [prodData, setProdData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  
  
    const fetchProdInfo = async () => {
      console.log("url",`${process.env.REACT_APP_SERVER_URL}/user/cart`);
      try{
          console.log("inside");
          console.log(`Bearer ${process.env.REACT_APP_TOKEN}`)
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/cart`,{
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

    const handleremoveFromCart = async (productId,platformId) =>{
      try{
            console.log("blahhh")
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/removecart`,{
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
            setProdData(prodData.filter(obj => obj._id != productId));

          }
          else{
            const text = await res.text();
            console.log(text);
          }
          }catch(err){
            console.log(err);
          }
  }

  const handlePlaceOrder = async () => {
    try{
      console.log("place ordrr", prodData)
      console.log("url",`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/placeOrder`);

      const resparr = await Promise.all(prodData.map(async (prodObj) => {
        console.log("inside");
        const res = await fetch(`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/placeOrder`,{
          method: "POST",
          body: JSON.stringify({
            platformId: prodObj.platformId,
            productId: prodObj.productId,
            name: user.name,
            phone: user.phone,
            // address: `{user.address`
          }),
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
            "Content-type": "application/json; charset=UTF-8"
          }
        })

        // return await res.json();

        const contentType = res.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1){
          const response = await res.json();
          console.log(response);
          return response;
        }
        else{
          const text = await res.text();
          console.log(text);

          return text;
        }

      }));

      const resparr2 = await Promise.all(prodData.map(async (prodObj,idx) => {
        console.log("here",prodObj);
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/order`,{
          method: "POST",
          body: JSON.stringify({
            userId: user._id,
            // order_date:req.body.date, 
            amount: prodObj.price,
            platformId: prodObj.platformId, 
            orderId: resparr[idx]._id  
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
          return response;
        }
        else{
          const text = await res.text();
          console.log(text);

          return text;
        }

      }));

      console.log("whyy",resparr,resparr2);
      navigate('/');

    }catch(err){
      console.log(err);
    }
  }

  useMemo(() => {
    let tmpTot = 0;
    prodData.map((productObj)=>{
      tmpTot+= productObj.price;
    })
    setCartTotal(tmpTot);

  }, [prodData]);
  return (
    <Layout>
    <div className='container nav-div'>
      <h4 className='heading'> My Bag </h4>
    
    <div className='container'>
    <div className='row' style={{"marginBottom" : "80px"}}>
      <div className='col col-md-9'>
      {prodData.map((productObj) => {

        return(
        <div className='row row-list'>
        <div className="col-md-6 my-auto">
           <div className="row"> 
           <div className="col-md-5 my-auto">
            <p className="product-title">
              <img
                src={productObj.images[0]}
                style={{ width: 50, height: 50 , marginRight: "12px"}}
                alt=""
              />
               {productObj.name}
            </p>
            </div>
            <div className="col-md-6 my-auto">
            <p className="product-desc">
              {productObj.description}
            </p>
            </div>
           </div>
          </div>
  
          
  
          <div className="col-md-2 my-auto">
            <p className="product-quantity"> {productObj.quantity} left</p>
          </div>

          <div className="col-md-2 my-auto">
            <p className="product-price"> Rs. {productObj.price} </p>
          </div>

          <div className="col-md-2 my-auto">
            <button type="button" className="btn" 
              onClick={(e)=>{
                e.preventDefault();
                handleremoveFromCart(productObj._id,productObj.platformId)}}>
                <i className="fa fa-trash-o fa-lg" aria-hidden="true" />
            </button>
          </div>
  
        </div>
      );})}

      </div>
      <div className='col col-md-3' style={{"padding-left": "35px"}}>
         <h7>Order Details</h7>
         <p>Bag total: <span>Rs. {cartTotal}</span></p>
         <h7> 
         <i className="fa fa-map-marker" aria-hidden="true" /> Delivery Address </h7>
         {/* <p>egg {user}"</p> */}
         <p>{user.address.locality} <br/> {user.address.city} {user.address.state} <br/> {user.address.country} {user.address.postal_code}</p>

         <button type="button" className="btn btn-dark" 
         onClick={()=>{handlePlaceOrder()}}>
          Place Order</button>
      </div>

    </div>
    </div>
    </div>
    </Layout>
  )
}

export default Cart