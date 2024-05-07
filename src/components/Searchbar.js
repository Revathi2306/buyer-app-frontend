import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  return (
    <nav className="navbar fixed-top navbar-light bg-light navbar-expand-lg bg-body-tertiary search-div">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     
     {/* <form className="form-inline container d-flex ">
         <input
         className="form-control mr-sm-2 search-input"
         type="search"
         placeholder="Search"
         aria-label="Search"
         onChange={(e)=>{
          e.preventDefault();
          setSearchInput(e.target.value);
         }}
         value={searchInput}
         />
         <button className="btn btn-dark my-2 my-sm-0 btn-search" type="submit">
            <i className="fa-solid fa-magnifying-glass"  />
         </button>
     </form> */}
    
     <li className="">
        <button className="btn btn-outline-success my-2 my-sm-0 btn-circle" type=""
         onClick={()=>{navigate("/wishlist")}}>
          <i className="fa-regular fa-heart" />
         </button>
     </li>
     <li className="">
        <button className="btn btn-outline-success my-2 my-sm-0 btn-circle" type=""
         onClick={()=>{navigate("/cart")}}>
         <i className="fa-solid fa-bag-shopping fa-lg" />
        </button>
     </li>
    </ul>
    </nav>
  )
}

export default Searchbar