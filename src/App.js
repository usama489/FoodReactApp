
// Import necessary dependencies
import { useEffect, useState,lazy,Suspense,useContext } from "react";
import ReactDOM from "react-dom/client";
import RestaurantCard from "./component/RestaurantCard/RestaurantCard.js";
import Header from "./component/Header/Header.js";
import Search from "./component/Search/Search.js";
import Shimmer from "./component/Shimmer/Shimmer.js";
import About from "./component/About/About.js";
import UserContext from "./utils/UserContext.js";
import RestaurantMenu from "./component/RestaurantMenu/RestaurantMenu.js";
import { RESTAURANT_DATA_URL } from "./utils/constant.js";
// import Grocery from "./component/Grocery/Grocery.js";
import { Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from "react-router-dom";
import "../../NamasteReact/index.css";
import useOnlineStatus from "./utils/useOnlineStatus.js";
import {Provider} from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./component/Cart/Cart.js";
const Grocery = lazy(()=>import("./component/Grocery/Grocery.js")); //import is a a funciton which takes path not a normal import

// Root component (AppLayout)
const AppLayout = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [userName, setUserName] = useState("");
  const {loggedInUser} = useContext(UserContext)
  

 
  // const onlineStatus = useOnlineStatus();


  // Fetch restaurant data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(RESTAURANT_DATA_URL);
      const data = await response.json();
      const restaurants =
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (restaurants) {
        setListOfRestaurant(restaurants);
        setFilteredRestaurants(restaurants); // Initialize with all restaurants
        // console.log(restaurants);
      }
    } catch (error) {
      console.error("Failed to fetch restaurant data", error);
    }
  };

  // useEffect(()=>{
  //   // Make an API and send username and password
  //   const data = {name:"usama"};
  //   setUserName(data.name);
  // },[])

  // Filter top restaurants with rating >= 4.3
  const filterTopRestaurants = () => {
    const topRestaurants = listOfRestaurant.filter(
      (restaurant) => parseFloat(restaurant.info.avgRating) >= 4.3
    );
    setFilteredRestaurants(topRestaurants);
  };

  // Filter restaurants based on search input
  const handleSearch = (searchText) => {
    const searchedRestaurants = listOfRestaurant.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredRestaurants(searchedRestaurants);
  };
  // if(onlineStatus===false){
  //   return(<h1>Internet not available</h1>)
  // }

  return (
    <Provider store={appStore}>
    <UserContext.Provider value = {{loggedInUser:userName,setUserName}}>
    <div className="app">
      <Header />
      {/* We pass filtered restaurants and the filtering functions as context to the child components using the Outlet */}
      <Outlet //render child comp inside parent comp(Header), allow us to nested route
        context={{
          filteredRestaurants,
          handleSearch,
          filterTopRestaurants,
        
        }}
      />
    
    </div>
    </UserContext.Provider>
    </Provider>
  );
};

// Home Component (for the "/" route)
const Home = () => {
  // we use the useOutletContext() hook to get the context inside the Home component
  // This hook is the correct way to pass data from the parent component (via Outlet) to child routes.
  // The / route renders the Home Component, which recieves filteredRestaurants, handlSearch and filterTopRestaurants from AppLayout
  // The context passed to the Outlet is available in child components theorght useOutletContext() hook.
  const { filteredRestaurants, handleSearch, filterTopRestaurants } = useOutletContext(); 
  

  return (
    <>
      <div className="searchComponent">
        <Search onFilterSearch={handleSearch} onFilter={filterTopRestaurants} />
      </div>
      <div className="restaurantContainer">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}>
              
                <RestaurantCard resData={restaurant} />
              
              </Link>
            
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </>
  );
};


// Define routes using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/", // Root path (Home)
        element: <Home />,
      },
      {
        path: "/about", // About page
        element: <About />,
      },
      {
        path: "/restaurants/:resId", // Dynamic route for restaurant menu
        element: <RestaurantMenu />, // Render RestaurantMenuPage component
      },
      {
        path:"/grocery",
        element:(<Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>)
      },
      {
        path:"/cart",
        element:<Cart/>
      },
    ],
  },
]);

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

/* 
                                                                1
Components and Routing Flow
----------------------------

There are three main pieces in the app:

AppLayout:
----------
1. This is the main component.The AppLayout component serves as the base layout for the entire app. 
2. It fetches restaurant data, manages state, and provides this data to child components.
Home:
------
This is the default page (when visiting /). It displays the search bar and restaurant cards.
About:
------
A simple page rendered when visiting the /about route. 
-----------------------------------------------------------------------------------------------------------------
                                          2


Using Outlet for Nested Routes:
-------------------------------

The Outlet component is placed inside AppLayout. This allows child routes (like the home page and the About page) to render within the same layout.
Updated Routing Configuration:

The createBrowserRouter now has nested routes.
The path: "/" shows the restaurant cards and Search component.
The path: "/about" renders the About component within the AppLayout.
Simplified Header:

The Header is moved directly into AppLayout to ensure it remains visible across all routes.



*/