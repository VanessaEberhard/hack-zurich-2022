import { memo } from "react";
import PageTemplate from "./PageTemplate";
import ProfileData from "./ProfileDetail";

const sidebarElements = [
  {
    title: "Settings",
    route: "/profile/settings",
  },
];

const Profile = () => {
  return (
    <PageTemplate navElements={sidebarElements} defaultMenu="settings">
      <ProfileData />
    </PageTemplate>
  );
};

export default memo(Profile);
