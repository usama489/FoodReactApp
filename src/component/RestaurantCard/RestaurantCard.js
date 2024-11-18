import "./RestaurantCard.css";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { RESTAURANT_CARD_IMAGE_URL } from "../../utils/constant";

const RestaurantCard = (props) => {
  // console.log(props);
  const {name,cuisines,costForTwo,avgRating,cloudinaryImageId,sla:{deliveryTime}} = props?.resData?.info ;
  const {loggedInUser} = useContext(UserContext);

  
  return (
 
   
      <div className="restaurantCard">
        <img
          className="restaurantCardImage"
          src={RESTAURANT_CARD_IMAGE_URL+cloudinaryImageId}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{deliveryTime} Minutes</h4>
        <h4>{loggedInUser}</h4>
      </div>
   
  );
};
export default RestaurantCard;

// export const withPromotedLabel = (RestaurantCard)=>{
//   // return component
//   return(props)=>{
//     //return JSX
//     return(
//       <div>
//         <label>Promoted</label>
//         <RestaurantCard {...props}/>
//       </div>
//     )
//   }
// }

