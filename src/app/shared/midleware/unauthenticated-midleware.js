import { isRejectedWithValue } from "@reduxjs/toolkit";
import { loggedOut } from "../../../features/user/user-slice";

export const unauthenticatedMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(loggedOut());
      window.location.href = "/login";
    }

    return next(action);
  };
