import { styled } from "@mui/material/styles";
import { AppBar, Typography, Button } from "@mui/material";

export const APP_BAR_HEIGHT = 70;

export const StyledAppBar = styled(AppBar)`
  display: flex;
  justify-content: center;
  height: ${APP_BAR_HEIGHT}px;

  box-shadow: unset;
  border-bottom: 1px solid rgba(24, 24, 24, 0.05);

  .MuiToolbar-root {
    padding: 0 30px;
  }
`;

export const Title = styled(Typography)`
  margin-left: 40px;
`;

export const NavButton = styled(Button)`
  color: #D0B5AF;
  text-transform: capitalize;
`;
