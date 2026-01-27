import { createContext, useContext, useState } from "react";

export const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export function RoleContextProvider({ children }) {
  const [role, setRole] = useState("");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
