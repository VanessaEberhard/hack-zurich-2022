import Settings from "components/Settings";

const { useParams } = require("react-router-dom");

const data = {
  settings: <Settings />,
};

const ProfileData = () => {
  const { detailId } = useParams();

  return data[detailId] || data.settings;
};

export default ProfileData;
