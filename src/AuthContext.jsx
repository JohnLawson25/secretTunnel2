import { createContext, useContext, useState } from "react";
import axios from "axios";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const SignUp = async(credentials) => {
  try {
    const { data } = await axios.post("https://fsa-jwt-practice.herokuapp.com/signup", credentials)
    window.localStorage.setItem("token", data.token)
    setLocation("TABLET");
    console.log(data.token)
  } catch (error) {
    console.error(error)
  }
};
  

  // TODO: authenticate

  const Authenticate = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const{ data } = await axios.get("https://fsa-jwt-practice.herokuapp.com/authenticate",
          { headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
      }
      })
        console.log(data)
        if (!data.success) throw Error("Authentication failed.");
      setLocation("TUNNEL");
      } catch (error) {
        console.error(error);
      }
  
};


  const value = { SignUp, Authenticate, location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
