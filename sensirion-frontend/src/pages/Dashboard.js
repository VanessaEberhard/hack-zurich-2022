import { memo } from "react";
import DashboardDetail from "./DashboardDetail";
import PageTemplate from "./PageTemplate";

const sidebarElements = [
  {
    title: "Past",
    route: "/dashboard/past",
  },
  {
    title: "Today",
    route: "/dashboard/today",
  },
  {
    title: "Future",
    route: "/dashboard/future",
  },
];

const Dashboard = () => {
  return (
    <PageTemplate sidebarElements={sidebarElements}>
      <DashboardDetail />
    </PageTemplate>
  );
};

export default memo(Dashboard);
