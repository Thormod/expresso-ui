import "./App.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme } from "./theme";
import { styled } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { TopNav } from "./layouts/dashboard/top-nav";
import { securityHandler } from "./features/security/security";
import SideNav from "./layouts/dashboard/side-nav";
import Spinner from "./components/shared/spinner";
import { CONFIG } from "./app/constants";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "./features/user/user-slice";
import "devextreme/dist/css/dx.light.css";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export default function App() {
  const theme = createTheme();
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const dispatch = useDispatch();

  const {
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  securityHandler.setAccessTokenSilently(getAccessTokenSilently);

  async function getClaims() {
    if (isAuthenticated) {
      if (user) {
        const loginPayload = {
          profile: user,
        };

        dispatch(loggedIn(loginPayload));
        setIsLoadedUser(true);
      }
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (user) {
      getClaims();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!isAuthenticated && CONFIG.AUTH0_ENABLED) {
    loginWithRedirect();
    return <Spinner></Spinner>;
  }

  if (!isLoadedUser) {
    return <Spinner></Spinner>;
  }

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <TopNav onNavOpen={() => setOpenNav(true)} />
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>
              <Outlet />
            </LayoutContainer>
          </LayoutRoot>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
