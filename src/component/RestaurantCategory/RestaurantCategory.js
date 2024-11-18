// After lifting state up means moving state to its parent componenet to manage state so it can keep information of 
// all children component whether expanded or collapsed so we can collapse opened and opened collapsed  


import "./RestaurantCategory.css";
import {addItem} from "../../utils/cartSlice";
import {useDispatch} from "react-redux";

const RestaurantCategory = ({ data,index,isActive, onToggle }) => {
  
  // console.log(data);
  const {title, itemCards } = data?.card?.card || {}; // Destructure title and items
  const dispatch = useDispatch();   //got function bcoz of useDispatch() hook
  const handleAddItem = (itemCard)=>{
    dispatch(addItem(itemCard));
  }
 


  return (
    <div className="categoryContainer">
      {/* Accordion Header */}
      <div className="accordionHeader" onClick={onToggle}>
        <h2>{title}</h2>
        <h1 className="arrowButton">{isActive ? "⬆" : "⬇"}</h1>
      </div>

      {/* Accordion Content */}

      {isActive && (
        <div className="accordionContent">
          {itemCards?.map((itemCard)=>(

            <div key={itemCard?.card?.info?.id} className="accordionItem">
                <div className="itemDetails">
                      <h3 className="itemName">{itemCard.card.info.name}</h3>
                      <p className="itemPrice">
                        ₹
                        {itemCard.card.info.defaultPrice / 100 ||
                          itemCard.card.info.price / 100}
                      </p>
                      <p className="itemRating">
                        {typeof itemCard.card.info.ratings.aggregatedRating
                          .rating === "string"
                          ? "⭐" +
                            itemCard.card.info.ratings.aggregatedRating.rating
                          : ""}
                      </p>
                      <p className="itemDescription">
                        {itemCard.card.info.description}
                      </p>
                </div>

                    <div className="imageContainer">
                      <img
                        className="itemImage"
                        alt={itemCard.card.info.name}
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemCard.card.info.imageId}`}
                      />
                      <button className="addButton" onClick={()=>handleAddItem(itemCard)}>ADD</button>
                      <p className="customizableText">Customisable</p>
                    </div>
            </div>
          ))}
        </div>
      )}
</div>
)
}




export default RestaurantCategory;






























//RestaurantCategory.js (Before lifting state up means stat ei smanaging by itself )


//  import { useState } from "react";
//  import "./RestaurantCategory.css"

//  const RestaurantCategory = ({ data }) => {
  
//   console.log(data);

//   const [activeIndex, setActiveIndex] = useState(null); // Track which accordion is open




//   const handleAccordionToggle = (index) => {
//      If the clicked accordion is already active, close it; otherwise, set it active
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="categoryContainer">
//       {data?.map((cards, index) => {
//         console.log(cards);
        
//         const isItemCategory =
//            cards?.card?.card["@type"] ===
//           "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

//         return (
//           <div key={`category-${index}`}>
//              Accordion Header 

//              <div
//               className="accordionHeader"
//               onClick={() => handleAccordionToggle(index)}
//             >
//               <h2>{cards?.card?.card?.title}</h2>
//               <h1 className="arrowButton">
//                 {activeIndex === index ? "⬆" : "⬇"}
//               </h1>
//             </div> 

//              Accordion Content 

//              {activeIndex === index && (
//               <div className="accordionContent">
//                 {isItemCategory && (
                  
//                   cards.card.card.itemCards.map(itemCards=>(
//                     <div key={itemCards.card.info.id} className="accordionItem">
//                     <div className="itemDetails">
//                       <h3 className="itemName">{itemCards.card.info.name}</h3>
//                       <p className="itemPrice">
//                         ₹
//                         {itemCards.card.info.defaultPrice / 100 ||
//                           itemCards.card.info.price / 100}
//                       </p>
//                       <p className="itemRating">
//                         {typeof itemCards.card.info.ratings.aggregatedRating
//                           .rating === "string"
//                           ? "⭐" +
//                             itemCards.card.info.ratings.aggregatedRating.rating
//                           : ""}
//                       </p>
//                       <p className="itemDescription">
//                         {itemCards.card.info.description}
//                       </p>
//                     </div>
//                     <div className="imageContainer">
//                       <img
//                         className="itemImage"
//                         alt={itemCards.card.info.name}
//                         src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemCards.card.info.imageId}`}
//                       />
//                       <button className="addButton">ADD</button>
//                       <p className="customizableText">Customisable</p>
//                     </div>
//                   </div>


//                   ))
                  
//                 )}
                              
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default RestaurantCategory; 
