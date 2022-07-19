import React, { useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "../layoutComp.css";
import { useDispatch, useSelector } from "react-redux";
import { trueLogin, falseLogin } from "../slice/isLoginSlice";
import UserContext from "../UserContext";

const LayoutComp = () => {
  const { token, setToken } = useContext(UserContext);
  const dispatch = useDispatch();
  let isLoginState = useSelector((state) => state.login);
  useEffect(() => {
    console.log("isLogin : ", isLoginState);
  }, [isLoginState]);

  const onClickLogout = () => {
    dispatch(falseLogin());
    !isLoginState && localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div>
      <nav>
        {token ? (
          <ul>
            <li>
              <Link to="register">Register</Link>
            </li>
            <li>
              <Link to="/" onClick={onClickLogout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default LayoutComp;
