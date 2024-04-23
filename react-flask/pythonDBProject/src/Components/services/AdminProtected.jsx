import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtected = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("adminAccessToken");
    if (isLogin) {
      setIsAuth(true);
    } else {
      navigate("/admin");
      setIsAuth(false);
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
