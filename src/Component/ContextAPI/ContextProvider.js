import React, { useState } from "react";
import {UserContext} from "./Context";

export const UserContextProvider = ({children}) => {
    const [login, setLogin] = React.useState(false)
    const [user, setUser] = useState({})
    
    return(
        <UserContext.Provider value={{login, setLogin, user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}

