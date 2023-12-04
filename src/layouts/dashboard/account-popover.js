import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../features/user/user-slice";
import { useNavigate } from "react-router-dom";

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, userProfile } = props;
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    onClose?.();

    logout({
      returnTo: window.location.origin,
    });

    dispatch(loggedOut());
  }, [onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {userProfile.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={() => navigate("/user/profile")}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default AccountPopover;
