import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/store/hooks";
import logo from "../assets/logo.jpg";

import { RootState } from "../types/store.type";
import {
  authorizeThunk,
  logoutThunk,
  UserState,
  prepareForLogout,
} from "../redux/slices/userSlice";

import { useEffect } from "react";
import React from "react";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleLOGOUTClick = () => {
    dispatch(prepareForLogout());
    dispatch(logoutThunk());
    navigate("/login");
  };

  useEffect(() => {
    if (user.isAuth) dispatch(authorizeThunk());
  }, [user.isAuth]);

  return (
    <Box m={1}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <img src={logo} alt="logo" className="w-24" />
        </Grid>
        <Grid item>
          <span style={{ fontSize: "20px" }} data-testid="test">
            {user.isAuth && pathname !== "/registration" ? user.name : " "}
          </span>
          <LogoutButton
            handleLOGOUTClick={handleLOGOUTClick}
            user={user}
            pathname={pathname}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
interface LogoutButtonProps {
  handleLOGOUTClick: () => void;
  user: UserState;
  pathname: string;
}

const LogoutButton = ({
  handleLOGOUTClick,
  user,
  pathname,
}: LogoutButtonProps) => {
  if (!user.isAuth || pathname === "/registration") {
    return <></>;
  } else {
    return (
      <Button
        variant="outlined"
        color="secondary"
        sx={{ ml: "20px" }}
        onClick={handleLOGOUTClick}
      >
        LOGOUT
      </Button>
    );
  }
};

export default Header;
