import "./Search.css";
import { useState,useContext } from "react";
import UserContext from "../../utils/UserContext";

const search = ({ onFilter, onFilterSearch }) => {

  const [searchText, setSearchText] = useState("");
  // const [boxValue,setBoxValue] = useState(null);
  const {loggedInUser, setUserName} = useContext(UserContext);

  //call the handleSearch function of App.js with input text that is searchText
  const handleSearchClick = ()=>{
    onFilterSearch(searchText);
  }

  // console.log("search component rendered");

  return (
    <>
      <div className="container">
        <div className="searchBoxContainer">
          <input
            className="searchBox"
            placeholder="Search here..."
            value={searchText}
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="searchButton"
            onClick={()=>{
                console.log("search button clickeds");
                handleSearchClick()
                
                

            }}
          >
            Search
          </button>
        </div>

        <div className="TopRestaurantButtonContainer">
          <button
            type="submit"
            className="TopRestaurantButton"
            onClick={() => {
              console.log("Button clicked");
              onFilter();
              
            }}
          >
            Top Restaurant
          </button>
        </div>
        <div className="useContextValueChangeBox">
          <input type="text" value={loggedInUser} placeholder="Enter UserName..." onChange={(e)=>{
            setUserName(e.target.value);
          }}/>
        </div>
      </div>
    </>
  );
};
export default search;
