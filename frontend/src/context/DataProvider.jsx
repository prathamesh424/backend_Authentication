import { useState , createContext } from "react";

export const DataContext = createContext(null) ;

const DataProvider = ({ children }) => { 
    const [User , setUser] = useState({username : '' , email : '' , avatar: '' , coverImage: ''}) ;

    return (
        <DataContext.Provider  value= {{User , setUser}}>
            {children}
        </DataContext.Provider>
    )
};


export default DataProvider ;