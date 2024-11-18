import "./Header.css";
import {useState, useContext} from "react";
import {Link} from "react-router-dom"
import useOnlineStatus from "../../utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import {useSelector} from "react-redux"; 

const Header = () => {
  const[btn,setBtn] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);
  console.log(loggedInUser);
  const cartItems = useSelector((store)=>store.cart.items);
    return (
      <>
      <div className="header">

          <ul className="navListItem">
            <li className="logoContainer"> <img className="logo" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/portal/c/logo_2022.png" /></li>
            <li>Home</li>
           <li><Link to="/about"  className="about">About us</Link></li>
            <li>Contact Us</li>
            <li><Link to="/cart">Cart:{cartItems.length}🛒</Link></li>
            <li><Link to="/grocery">Grocery</Link></li>
            <li>Online Status:{onlineStatus?"✅":"❌"}</li>
            <li><button className="headerLoginButton" onClick={()=>{
              btn==="Login"?setBtn("Logout"):setBtn("Login");
            }}>{btn}</button></li>
            <li>{loggedInUser}</li>
            
          </ul>
        
      </div>


      </>
     
      
    );
  };
  export default Header;