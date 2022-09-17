import { INFORMATIONS } from "const/app";
import { LINE_CHART, RADIAL_BAR } from "const/mockData/today";
import { memo, useCallback, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useRecoilValue, useRecoilState } from "recoil";
import { roomsState, selectedRoomState } from "states/app";
import CustomResponsiveRadialBar from "utils/CustomResponsiveRadialBar";
import CustomLineChart from "utils/LineChart";

const Today = () => {
  const [infosShowed, setInfosShowed] = useState(INFORMATIONS);

  const rooms = useRecoilValue(roomsState);
  const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);

  const changeInfosShowed = useCallback(
    (value) => {
      const searchElement = infosShowed.findIndex(
        (info) => info.value === value.value
      );
      const copyArray = [...infosShowed];
      copyArray[searchElement].selected = !copyArray[searchElement].selected;
      setInfosShowed(copyArray);
    },
    [infosShowed]
  );

  const changeSelectedRoom = useCallback((value) => {
    const findElement = rooms.findIndex((room) => room.value === value);
    setSelectedRoom(rooms[findElement]);
  }, [rooms, setSelectedRoom]);

  return (
    <div>
      <Container fluid>
        <Row className="flex-nowrap">
          <Col sm={4}>
            <Form.Select
              onChange={(e) => changeSelectedRoom(e.target.value)}
              defaultValue={selectedRoom.value}
            >
              <option disabled>Select your room: </option>
              {rooms.map((room) => (
                <option value={room.value} key={room.value}>
                  {room.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="flex-nowrap">
          <Col className="d-flex justify-content-center">
            <CustomResponsiveRadialBar baseData={RADIAL_BAR} centerData="14°" />
          </Col>
          <Col className="d-flex justify-content-center">
            <div className="m-5">
              <div className="mt-3">Meals sold in the cafeteria: </div>
              <div className="d-flex justify-content-center">
                <div className="display-1">35</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="mb-2 mt-4">
        {infosShowed.map((info) => (
          <Form.Check
            inline
            label={info.name}
            name={info.value}
            type="checkbox"
            key={info.value}
            defaultChecked={info.selected}
            onChange={() => changeInfosShowed(info)}
          />
        ))}
      </div>
      <CustomLineChart data={LINE_CHART} lines={infosShowed} />
    </div>
  );
};

export default memo(Today);
