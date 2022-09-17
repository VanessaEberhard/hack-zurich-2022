import Sensors from "components/Sensors";
import Settings from "components/Settings";

const { useParams } = require("react-router-dom");

const data = {
  settings: <Settings />,
  sensors: <Sensors />,
};

const ProfileData = () => {
  const { detailId } = useParams();

  return data[detailId] || data.today;
};

export default ProfileData;
