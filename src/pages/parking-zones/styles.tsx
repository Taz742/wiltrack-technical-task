import { Box, styled } from "@mui/material";
import { APP_BAR_HEIGHT } from "../../components/app-bar/styles";

export const Container = styled(Box)`
  padding: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const MapContainer = styled(Box)`
  width: 100%;
  height: calc(100vh - ${APP_BAR_HEIGHT}px);
  position: relative;
  padding: 30px;
  box-sizing: border-box;
`;
