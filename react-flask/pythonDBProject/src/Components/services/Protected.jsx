import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("accessToken");
    if (isLogin) {
      setIsAuth(true);
    } else {
      navigate("/login");
      setIsAuth(false);
    }
  }, [isAuth]);

  return <>{isAuth && <Component />}</>;
};

export default Protected;
