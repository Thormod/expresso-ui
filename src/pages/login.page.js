import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/shared/spinner";

export default function LoginPage() {
  const { isLoading, logout } = useAuth0();

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  logout({ returnTo: window.location.origin });

  return <Spinner></Spinner>;
}
