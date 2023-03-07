import * as React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { authorizeThunk } from "./redux/slices/userSlice";
import { RootState } from "./types/store.type";
import { useAppSelector, useAppDispatch } from "./redux/store/hooks";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
