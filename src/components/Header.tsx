import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import logo from "../assets/logo.jpg";

import React from "react";

function Header() {
  const userName = window.localStorage.getItem("user_name");

  const handleLOGOUTClick = () => {
    // TODO logout
  };

  return (
    <Box m={1}>
      <Grid container className="justify-between">
        <Grid item>
          <img src={logo} alt="logo" className="w-24" />
        </Grid>
        <Grid item>
          <span style={{ fontSize: "20px" }} data-testid="test">
            {userName}
          </span>
          <span className={`${userName ? "" : "invisible"}`}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: "20px" }}
              onClick={handleLOGOUTClick}
            >
              LOGOUT
            </Button>
          </span>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
