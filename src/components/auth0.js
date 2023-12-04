import { Auth0Provider } from "@auth0/auth0-react";
import { CONFIG } from "../app/constants";

const Auth0 = ({ children }) => {
  const domain = CONFIG.AUTH0_DOMAIN || "";
  const clientId = CONFIG.AUTH0_CLIENTID || "";
  const redirectUri = `${window.location.origin}`;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0;
