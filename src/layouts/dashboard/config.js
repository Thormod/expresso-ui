import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon";
import MapIcon from "@heroicons/react/24/solid/MapIcon";
import Cog6ToothIcon from "@heroicons/react/24/solid/Cog6ToothIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Requests",
    path: "/requests",
    icon: (
      <SvgIcon fontSize="small">
        <WrenchIcon />
      </SvgIcon>
    ),
    isAdmin: false,
  },
  {
    title: "Establishments",
    path: "/establishments",
    icon: (
      <SvgIcon fontSize="small">
        <MapIcon />
      </SvgIcon>
    ),
    isAdmin: true,
  },
];
