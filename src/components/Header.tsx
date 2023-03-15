import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import logo from "../assets/logo.jpg";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "../services/auth";

function Header() {
  const userName = window.localStorage.getItem("user_name");
  const currentPath = window.location.href;
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      window.localStorage.removeItem("user_token");
      window.localStorage.removeItem("user_name");
      navigate("/login");
    },
  });

  const handleLOGOUTClick = () => {
    logoutMutation.mutate();
  };

  return (
    <Box m={1}>
      <Grid container className="justify-between">
        <Grid item>
          <img src={logo} alt="logo" className="w-24" />
        </Grid>
        <Grid item>
          {currentPath.slice(0, -1) === String(window.location.origin) ||
          currentPath.includes("login") ||
          currentPath.includes("registration") ? (
            <></>
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
