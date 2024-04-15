import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtected = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { Component } = props;
  const navigate = useNavigate();

  debugger;
  useEffect(() => {
    const isLogin = sessionStorage.getItem("adminAccessToken");
    if (isLogin) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      {isAuth && (
        <div>
          <Component />
        </div>
      )}
    </>
  );
};

export default AdminProtected;
