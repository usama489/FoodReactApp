import {useEffect,useState} from "react"

const useRestaurantMenu = (resId)=>{
    const [resInfo,setResInfo] = useState(null)
    useEffect(() => {
        fetchMenu();
      }, []); //fetching only once
    
      const fetchMenu = async () => {
      
        const response = await fetch(
          "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER"
        );
        const data = await response.json();
        // console.log(data);
        setResInfo(data);
      };
      return resInfo;
}
export default useRestaurantMenu;
// the contract of hook take the resID and fetch data and return the restrauant information

