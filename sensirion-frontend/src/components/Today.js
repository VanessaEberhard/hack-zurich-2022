import axios from "axios";
import { INFORMATIONS } from "const/app";
import { BASE_URL } from "const/env";
import { memo, useCallback, useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useRecoilValue, useRecoilState } from "recoil";
import { roomsState, selectedRoomState } from "states/app";
import CustomResponsiveRadialBar from "utils/CustomResponsiveRadialBar";
import CustomLineChart from "utils/LineChart";

const Today = () => {
  const [infosShowed, setInfosShowed] = useState(INFORMATIONS);
  const [roomInformation, setRoomInformation] = useState({});
  const [roomInformationLineChart, setRoomInformationLineChart] = useState([]);

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

  const changeSelectedRoom = useCallback(
    (value) => {
      const findElement = rooms.findIndex((room) => room.value === value);
      setSelectedRoom(rooms[findElement]);
    },
    [rooms, setSelectedRoom]
  );

  useEffect(() => {
    const searchElement = infosShowed.findIndex(
      (info) => info.value === "consumed_meals"
    );
    const copyArray = [...infosShowed];
    if (selectedRoom.value === "room_b") {
      copyArray[searchElement].selected = false;
      copyArray[searchElement].disabled = true;
      setInfosShowed(copyArray);
    } else if (selectedRoom.value === "room_a") {
      copyArray[searchElement].disabled = false;
      copyArray[searchElement].selected = true;
      setInfosShowed(copyArray);
    }

    axios
      .get(`${BASE_URL}/present`, {
        params: { room: selectedRoom.value },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        const voc = parseInt(response.data.voc) || 0;
        const co2 = parseInt(response.data.co2) || 0;
        const radialBar = [
          {
            name: "CO2",
            value: co2,
            fill: 400 < co2 && co2 < 1000 ? "green" : co2 < 2000 ? "orange" : "red",
          },
          {
            name: "VOC",
            value: voc * 10,
            fill: voc < 100 ? "green" : voc < 250 ? "orange" : "red",
          },
        ];
        setRoomInformation({ ...response.data, radialBar: radialBar });
      });

    axios
      .get(`${BASE_URL}/past`, {
        params: { room: selectedRoom.value },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        const data = [...response.data];
        const validatedData = data.map((info) => {
          const woDate = info.timestamp.substring(
            info.timestamp.lastIndexOf(" ") + 1,
            info.timestamp.length
          );
          return {
            timestamp: woDate.substring(0, woDate.lastIndexOf(":")),
            voc: (parseFloat(info.voc) || 0).toFixed(2),
            temp: (parseFloat(info.temp) || 0).toFixed(2),
            co2: (parseFloat(info.co2) || 0).toFixed(2),
            consumed_meals: info.consumed_meals
              ? parseInt(info.consumed_meals)
              : null,
          };
        });
        setRoomInformationLineChart(validatedData);
      });
  }, [selectedRoom]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!roomInformation) return;

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
            <CustomResponsiveRadialBar
              baseData={roomInformation.radialBar}
              centerData={`${parseFloat(roomInformation.temp).toFixed(2)}°`}
            />
          </Col>
          {selectedRoom.value === "room_a" && (
            <Col className="d-flex justify-content-center">
              <div className="m-5">
                <div className="mt-3">Meals sold in the cafeteria: </div>
                <div className="d-flex justify-content-center">
                  <div className="display-1">
                    {roomInformation.consumed_meals}
                  </div>
                </div>
              </div>
            </Col>
          )}
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
            disabled={info.disabled || false}
            checked={info.selected}
            onChange={() => changeInfosShowed(info)}
          />
        ))}
      </div>
      <CustomLineChart data={roomInformationLineChart} lines={infosShowed} />
    </div>
  );
};

export default memo(Today);
