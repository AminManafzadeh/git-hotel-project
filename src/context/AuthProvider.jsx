import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthentication: false
}

const FAKE_USER = {
    name: "amin",
    email: "amin.mah1375@gmail.com",
    password: "123456"
}

function authReducer(state, { type, payload }) {
    switch (type) {
        case "login": {
            return {
                user: payload,
                isAuthentication: true
            }
        }
        case "logout": {
            return {
                user: null,
                isAuthentication: false
            }
        }
        default:
            throw new Error("Unknown action !!!")

    }
}




export default function AuthProvider({ children }) {

    const [{ user, isAuthentication }, dispatch] = useReducer(authReducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER })
    }


    function logout(email, password) {
        if (email !== FAKE_USER.email || password !== FAKE_USER.password) dispatch({ type: "logout" })
    }


    return (
        <AuthContext.Provider value={{ user, isAuthentication, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}