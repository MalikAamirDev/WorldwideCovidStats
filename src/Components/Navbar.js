import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
// import Link from '@mui/material/Link';

export default function CovidAppBar() {
  return (
    <Box >
      <AppBar sx={{ fontSize: '20px', letterSpacing: '1px'}}>
        <Toolbar className='appbar'>
          <div className="navDiv">
            <NavLink to="/">
              Home
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
