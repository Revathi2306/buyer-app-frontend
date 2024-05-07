import React from 'react'
import Layout from '../components/layout/Layout'
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      
      <div className='container nav-div' style={{"maxWidth":"60vw", "paddingTop":"70px"}}>
      <div className="row contactus ">
        <div className="col">
          <h1 className="heading">CONTACT US <hr className='contact-line' /></h1>
          
          <p className="text-justify mt-2">
          We're here to assist you in any way we can. Feel free to reach out to us with your questions, concerns, or feedback. Our dedicated team is ready to help you navigate our platform and ensure your experience is seamless and enjoyable.
          </p>
          <p className="mt-3">
            <i className="fa-regular fa-envelope" /> www.help@sellerapp.com
          </p>
          <p className="mt-3">
            <i class="fa-solid fa-phone" /> 012-3456789
          </p>
        </div>
      </div>
      </div>

    </Layout>
  );
};

export default Contact;
