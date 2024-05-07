import {React,useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'

const Orders = () => {

  const [orderdata, setorderData] = useState([]);
  const [orderDetail, setorderDetail] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  const fetchInfo = async () => {
    try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/${userId}`,{
      method: "GET",
      credentials: 'include'
    }).then((res)=> res.json()).then(
      async (orderdata) => {

        console.log("akkku",orderdata);
        setorderData(orderdata);

        const orderDetail = await Promise.all( orderdata?.map(async (orderObj,idx)=>{

          console.log("inside:",idx," url: ", `${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/order/${orderObj.platform_id}/${orderObj.order_id}` );
          const res2 = await fetch(`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/order/${orderObj.platform_id}/${orderObj.order_id}`,{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
              "Content-type": "application/json; charset=UTF-8"
            }
          });

          console.log("mee");
          const contentType = res2.headers.get("content-type")
          if (contentType && contentType.indexOf("application/json") !== -1){
            const response = await res2.json();
            console.log(response);
            return response;
          }
          else{
            const text = await res2.text();
            console.log(text);
            return text;
          }
    
        }));

        setorderDetail(orderDetail);
        console.log("iam",orderDetail);
    })
    }catch(err){
      console.log("catch err",err);
    }

    
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handlecancelOrder = async (orderId,platformId) => {

    const res = await fetch(`${process.env.REACT_APP_ONDC_SERVER_URL}/commerce/cancelOrder`,{
      method: "PUT",
      body: JSON.stringify({
        platformId: platformId,
        itemId: orderId
      }),
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      credentials: 'include'
    });

    console.log("cancell", orderId, platformId);
    fetchInfo();
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
  }

  const conditionExpecteddate= (orderStatus,expDeliveryDate,orderId,platform_id)=>{
    if(orderStatus !== "cancel"){
      return (
        <>
        <div className="col-md-2 my-auto">
          <p className="order-expectedDate" >Expected Delivery: {expDeliveryDate} </p>
        </div>

        <div className="col-md-2 my-auto">
        <button type="button" className="btn cancel-btn" 
          onClick={()=>{handlecancelOrder(orderId,platform_id)}}>
            Cancel Order
        </button>
        </div>
        </>
      )
    }
    else{
      return(
        <div className="col-md-3 my-auto">
        <button type="button" className="btn-outline-danger" 
          onClick={()=>{handlecancelOrder(orderId,platform_id)}} disabled
          style={{"color": "#c43232", "border": "0.5px solid #c43232", "opacity":"60%"}}>
            Cancelled
        </button>
        </div>
      )
    }
  }

  return (
    <Layout>
    <div className='container nav-div'>
    <h4 className='heading'> My Orders </h4>
    <div className='container' style={{"marginBottom" : "80px"}}>

      {orderDetail.toReversed().map((orderObj,idx) => {
        return(
        <div className='row row-list'>
        <div className="col-md-6 my-auto">
           <div className="row"> 
           <div className="col-md-5 my-auto">
            <p className="product-title card-text">
              <img
                src={orderObj.images[0]}
                style={{ width: 50, height: 50 , marginRight: "12px"}}
                alt=""
              />
               {orderObj.name}
            </p>
            </div>
            <div className="col-md-6 my-auto">
            <p className="product-desc card-text">
              {orderObj.desc}
            </p>
            </div>
           </div>
          </div>

          <div className="col-md-2 my-auto">
            <p className={`order-status ${orderObj.status}`} >{orderObj.status} </p>
          </div>

          {
            conditionExpecteddate(orderObj.status,orderObj.expDeliveryDate,orderObj.orderId,orderdata[idx].platform_id)
          }
  
        </div>
      );})}
    </div>
    </div>
    </Layout>
  )
}

export default Orders