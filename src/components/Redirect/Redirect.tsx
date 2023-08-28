import React from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
};
