let getAccessTokenSilently = () => {
  return null;
};

export const securityHandler = {
  getAccessTokenSilently: () => getAccessTokenSilently,
  setAccessTokenSilently: (func) => (getAccessTokenSilently = func),
};
