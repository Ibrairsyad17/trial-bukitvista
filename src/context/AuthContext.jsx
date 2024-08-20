import {createContext, useReducer, useContext} from "react";

const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem("token") || null,
}

const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, token: action.payload}
        case "LOGOUT":
            return {...state, token: null}
        default:
            return state;
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
