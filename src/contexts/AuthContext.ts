import React from "react";

const AuthContext = React.createContext<{accessToken: string, setAccessToken: (accessToken: string)=>void}>({accessToken: "", setAccessToken: () => {}})
export default AuthContext