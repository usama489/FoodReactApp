import { useParams } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer";
import { useState } from "react";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
// import "./RestaurantMenu.css";
import RestaurantCategory from "../RestaurantCategory/RestaurantCategory";

const RestaurantMenu = () => {
  //reading restaurant id from url with the help of useParams()
  const { resId } = useParams();
  const [activeIndex,setActiveIndex] = useState(null);
 
  // Fetching data from API by using our custum hooks known as useRestaurantMenu on the basis of resId
  const resInfo = useRestaurantMenu(resId);
  
  //if data fetched by api for rendering menu is null so display shimmer until data get fetched completely
  if (resInfo === null) return <Shimmer />;

// categories variable containing array of all menu card like Recommended, Top Pick, "Rs 169 Deal Of The Day" etc
  const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  // console.log(categories);




  // consist array of menu card which have type ItemCategory
  const categoryItems = categories.filter(
    (categories) => categories.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );


  // console.log(categoryItems);

 const handleAccordionToggle = (index)=>{
  setActiveIndex(activeIndex === index ? null : index)
 }


    
      return (
        
          categoryItems.map((categoryItems,index)=>(
           <RestaurantCategory data={categoryItems} index={index} isActive = {activeIndex === index} onToggle = {()=>handleAccordionToggle(index)}/>

          ))
        
        // <div className="restaurantCategoryContainer">
        
           

        
      
        // </div>
      )
     

  
};

export default RestaurantMenu;








































//1


// import { useParams } from "react-router-dom";
// import Shimmer from "../Shimmer/Shimmer";
// import { useState } from "react";
// import useRestaurantMenu from "../../utils/useRestaurantMenu";
// // import "./RestaurantMenu.css";
// import RestaurantCategory from "../RestaurantCategory/RestaurantCategory";

// const RestaurantMenu = () => {
//   //reading restaurant id from url with the help of useParams()
//   const { resId } = useParams();
 
//   // Fetching data from API by using our custum hooks known as useRestaurantMenu on the basis of resId
//   const resInfo = useRestaurantMenu(resId);
  
//   //if data fetched by api for rendering menu is null so display shimmer until data get fetched completely
//   if (resInfo === null) return <Shimmer />;

// // categories variable containing array of all menu card like Recommended, Top Pick, "Rs 169 Deal Of The Day" etc
//   const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
//   console.log(categories);




//   // consist array of menu card which have type ItemCategory
//   const categoryItems = categories.filter(
//     (categories) => categories.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//   );


//   console.log(categoryItems);



    
//       return (
//         <div className="restaurantCategoryContainer">
         
//             <RestaurantCategory data={categoryItems}/>

        
      
//         </div>
//       )
     

  
// };

// export default RestaurantMenu;


































































//----------------------------------------------------------------------------------------------------------------


        {/* <div className="categoryContainer"> {categoryItems.map((items=>{
          
          return (
            <>
            <div className="accordionTitle">
            <h2>{items.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"?items.card.card.title:false}</h2>
            </div>
           
            <h4>{items.card.card.itemCards.map(itemCards=><div className="accordionData">{itemCards.card.info.name}</div>)}</h4>

           
         
          
          </>
        )
         }))}
        
     
        
       
    </div> */}