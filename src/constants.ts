const isTruthy = (field: any) => field === 'true' || field === true;

export const CONFIG = {
  AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
  AUTH0_CLIENTID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  AUTH0_SECRET: process.env.REACT_APP_AUTH0_SECRET,
  AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,
  AUTH0_NAMESPACE: process.env.REACT_APP_AUTH0_NAMESPACE,
  AUTH0_ENABLED: isTruthy(process.env.REACT_APP_AUTH0_ENABLED),
};

export const ACTION_TYPES = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
};
