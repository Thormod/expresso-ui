import { createSlice } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "../../app/constants";

const initialUserState = {
  profile: null,
  status: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    loggedIn(state, action) {
      state.profile = action.payload.profile;
      state.status = ACTION_TYPES.LOGGED_IN;
      state.siteId = action.payload.siteId;
      state.role = action.payload.role;
    },
    loggedOut(state) {
      state.profile = null;
      state.status = ACTION_TYPES.LOGGED_OUT;
      state.siteId = null;
      state.role = null;
      localStorage.removeItem("id_token");
      localStorage.removeItem("persist:root");
    },
    switchSiteId(state, action) {
      state.siteId = action.payload.siteId;
      state.role = action.payload.role;
    },
    setSiteIdMetadata(state, action) {
      state.siteMetadata = action.payload;
    },
  },
});

export const { loggedIn, loggedOut, switchSiteId, setSiteIdMetadata } =
  userSlice.actions;
export default userSlice.reducer;
