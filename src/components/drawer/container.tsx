import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { navItems } from "../app-bar/constants";
import { NavLink } from "react-router-dom";

interface IProps {
  open: boolean;
  handleCloseDrawer: () => void;
}

export const LeftDrawer: React.FC<IProps> = ({ open, handleCloseDrawer }) => {
  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={() => handleCloseDrawer()}>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={NavLink} key={item.title} to={item.to}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => handleCloseDrawer()}>
      {DrawerList}
    </Drawer>
  );
};
