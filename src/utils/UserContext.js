import {createContext} from "react";

// making a container to store data its like a global place where any component can access it easily
//by preventing props drilling
const UserContext = createContext({
    loggedInUser:"Default"
}


)
export default UserContext;