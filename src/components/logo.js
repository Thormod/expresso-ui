import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg height="70" width="70" viewBox="0 0 70 70" className="icon">
      <path
        d="M0 0L0 70L30 70L30 60L10 60L10 10L30 10L30 0ZM40 0L70 0L70 70L40 70L40 60L60 60L60 10L40 10ZM20 20L50 20L50 50L20 50L20 20ZM20 30L30 30L30 40L40 40L40 50L20 50L20 30Z"
        fillRule="evenodd"
        fill={fillColor}
      />
    </svg>
  );
};
