import { Shadows, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mdRegular: true;
    mdMedium: true;
    mdBold: true;
    textMd: true;
    textMdBold: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  mdRegular: React.CSSProperties;
  mdMedium: React.CSSProperties;
  mdBold: React.CSSProperties;
  textMd: React.CSSProperties;
  textMdBold: React.CSSProperties;
}

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    mdRegular: {
      fontFamily: "Poppins",
      fontSize: 36,
      fontWeight: 500,
    },
    mdMedium: {
      fontFamily: "Poppins",
      fontSize: 36,
      fontWeight: 600,
    },
    mdBold: {
      fontFamily: "Poppins",
      fontSize: 36,
      fontWeight: 700,
    },
    textMd: {
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: 500,
    },
    textMdBold: {
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: 700,
    },
  } as ExtendedTypographyOptions,
  palette: {
    primary: {
      main: "#4E342E",
    },
    secondary: {
      main: "#FCB525",
    },
    background: {
      paper: "#F6F5F5",
    },
    error: {
      main: "#A91D54",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 60 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { minHeight: 60 },
      },
    },
  },
  shadows: Array(25).fill("none") as Shadows,
});
