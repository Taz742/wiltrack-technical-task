import React, { useState } from "react";
import { Toolbar, Box, useMediaQuery, IconButton } from "@mui/material";

import { NavButton, StyledAppBar, Title } from "./styles";

import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { LeftDrawer } from "../drawer";
import { navItems } from "./constants";

interface IProps {
  title: string;
  children?: React.ReactNode;
}

export const AppBar: React.FC<IProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const hidden = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  return (
    <StyledAppBar position="static">
      <LeftDrawer open={open} handleCloseDrawer={() => toggleDrawer(false)} />
      <Toolbar>
        {!hidden && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/">
          <img src={Logo} alt="" width={110} />
        </Link>
        <Title variant="textMdBold" sx={{ display: { xs: "none", sm: "block" } }}>
          {title}
        </Title>
        <Box sx={{ display: { xs: "none", sm: "flex" }, ml: 8 }} columnGap={3}>
          {navItems.map((item) => (
            <NavButton href={item.to} key={item.to}>
              {item.title}
            </NavButton>
          ))}
        </Box>
        {children}
      </Toolbar>
    </StyledAppBar>
  );
};
