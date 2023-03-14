import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { H2, H4 } from "../../components/Title";
import { ILoginer } from "../../types/user.type";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const userLogin = useMutation({
    mutationFn: (loginer: ILoginer) => fetchLogin(loginer),
    onSuccess: (data) => {
      window.localStorage.setItem("user_token", data.result);
      window.localStorage.setItem("user_name", data.user.name);
    },
  });
  const handleLoginClick = () => {
    const loginer: ILoginer = {
      email: email,
      password: password,
    };
    userLogin.mutate(loginer);
  };

  userLogin.isSuccess && navigate("/courses");

  return (
    <Box className="flex flex-col w-96 m-auto gap-4">
      <H2 text="Login"></H2>
      <H4 text="Email"></H4>
      <TextField
        variant="outlined"
        label="Enter email"
        size="small"
        value={email}
        onChange={handleEmailChange}
      />
      <h4 className="text-lg font-semibold">Password</h4>
      <TextField
        variant="outlined"
        label="Enter Password"
        size="small"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <p>
        <Button variant="outlined" color="secondary" onClick={handleLoginClick}>
          Login
        </Button>
      </p>
      <p>
        If you not have an account you can{" "}
        <Link to="/registration" className="text-purple-600">
          Registration
        </Link>
      </p>
    </Box>
  );
}

export default Login;
