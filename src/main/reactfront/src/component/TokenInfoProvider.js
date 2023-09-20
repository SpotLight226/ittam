import React, { useState } from "react";

export const tokenInfoContext = React.createContext();

const TokenInfoProvider = ({ children }) => {
  const [role, setRole] = useState("none");
  const [username, setUsername] = useState("none");

  console.log("렌더링!!!");
  console.log(role);
  console.log(username);

  // 새로 고침하면 당연히 초기값으로 redux-persist or 쿠키에 저장하도록!!
  const handleChange = (newUsername, newRole) => {
    setUsername(newUsername);
    setRole(newRole);
  };

  return (
    <tokenInfoContext.Provider value={(role, username, handleChange)}>
      {children}
    </tokenInfoContext.Provider>
  );
};

export default TokenInfoProvider;
