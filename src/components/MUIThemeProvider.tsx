"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { ReactNode } from "react";

export default function MUIThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2089cf",
        contrastText: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
