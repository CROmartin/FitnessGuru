import React, { useEffect } from "react";
import OutOfService from "../components/Generator/OutOfService";
import { useNavigate } from "react-router-dom";

function Generator() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <OutOfService />;
}

export default Generator;
