import React from "react";
import { AuthProvider } from "./auth-context";
interface ProviderProps {
  children: any;
}
const Providers = (props: ProviderProps) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};
export default Providers;
