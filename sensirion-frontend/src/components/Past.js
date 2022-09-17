import { memo } from "react";
import Dashboard from "assets/Dashboard.png";

const Past = () => {
  return <img src={Dashboard} alt="Dashboard" className="img-dashboard" />;
};

export default memo(Past);
