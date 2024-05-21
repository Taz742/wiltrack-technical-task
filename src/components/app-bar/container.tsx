import React from "react";
import { Toolbar, Box } from "@mui/material";

import { NavButton, StyledAppBar, Title } from "./styles";

import Logo from "../../assets/images/logo.png";

const navItems = ["Item 1", "Item 2"];

interface IProps {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export const Appbar: React.FC<IProps> = ({ title, subTitle, children }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <img src={Logo} alt="" width={110} />
        <Title variant="textMdBold">{title}</Title>
        <Box sx={{ display: { xs: "none", sm: "flex" }, ml: 8 }} columnGap={3}>
          {navItems.map((item) => (
            <NavButton key={item}>{item}</NavButton>
          ))}
        </Box>
        {children}
      </Toolbar>
    </StyledAppBar>
  );
};
