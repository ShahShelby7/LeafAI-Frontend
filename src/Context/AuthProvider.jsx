import { createContext, useContext, useState } from "react";

//context creation(cotext is global state the can be accessed without passing as props)
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    // const user = localStorage.getItem("User");
    const user = typeof window !== "undefined" ? localStorage.getItem("User") : null;

    console.log(user);
    const [authUser, setAuthUser] = useState(     //this is the global state that can be used in all over the app components
        user ? JSON.parse(user) : undefined
    );
    //defining of context with state and children
    return (                                      //here children refer to all components inside authprovider component(thats why its defined as component and imported on index.js to make all components as children) and let all the children use the context state of parent authprovider
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}
//using the context by exporting as a hook(same as state)
export const useAuth = () => useContext(AuthContext);