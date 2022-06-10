import React, {useEffect, useState} from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Login from "./screens/Login";
import {useRoutes} from "raviger";
import AuthContext from './contexts/AuthContext'
import Home from "./screens/Home";
import Header from "./components/Header";
import Register from "./screens/Register";
import {ToastContainer} from "react-toastify";

const routes = {
  '/': () => <Login/>,
  '/register': () => <Register />
}

const authRoutes = {
  '/': () => <Home/>
}

function App() {
  let route = useRoutes(routes)
  let authRoute = useRoutes(authRoutes)
  
  const [accessToken, setAccessToken] = useState('')
  
  useEffect(()=>{
    console.log(`Access Token ${accessToken}`)
  }, [accessToken])
  
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{accessToken: accessToken, setAccessToken}}>
      <div className="App">
        {/*{accessToken.length > 1 ? <Header/> : null}*/}
        {/*  {accessToken.length > 1 ? authRoute : route}*/}
        {authRoute}
      </div>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
