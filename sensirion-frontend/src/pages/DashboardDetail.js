import Future from "components/Future";
import Past from "components/Past";
import Today from "components/Today";
import { memo } from "react";
import { useParams } from "react-router-dom";

const data = {
  today: <Today />,
  future: <Future />,
  past: <Past />,
};

const DashboardDetail = () => {
  const { detailId } = useParams();

  return data[detailId] || data.today;
};

export default memo(DashboardDetail);
