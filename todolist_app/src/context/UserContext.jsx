import React, { createContext, useState } from 'react'

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState({
        userId: 0,
        userEmail: "",
        isLoggedIn: Boolean(localStorage.getItem("ISLOGGEDIN")),
    });

    return (
        <UserContext.Provider
            value={{
                loggedInUser,
                setLoggedInUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };