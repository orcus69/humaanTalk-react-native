import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [basket, setBasket] = useState([]);

    function debug() {
        basket.forEach(element => {
            console.log(element.name);
        });
    }

    return (
        <AppContext.Provider value={{ user, setUser, basket, setBasket, debug }}>
            {children}
        </AppContext.Provider>
    );
}