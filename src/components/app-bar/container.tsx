import React from "react";
import { Toolbar, Box } from "@mui/material";

import { NavButton, StyledAppBar, Title } from "./styles";

import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const navItems = [
  {
    title: "Add Parking Zone",
    to: "/add-zone",
  },
];

interface IProps {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export const AppBar: React.FC<IProps> = ({ title, subTitle, children }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Link to="/">
          <img src={Logo} alt="" width={110} />
        </Link>
        <Title variant="textMdBold">{title}</Title>
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
