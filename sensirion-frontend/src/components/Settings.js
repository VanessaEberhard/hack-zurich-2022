import { memo } from "react";
import Building from "assets/Building.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { useRecoilValue } from 'recoil';
import { roomsState } from "states/app";

const Settings = () => {
  const rooms = useRecoilValue(roomsState);

  return (
    <div>
      <div className="h2 mb-2">Customer</div>
      <div>Sensirion Ltd</div>
      <div>Max Mustermann</div>
      <div className="h2 mb-5 mt-5">Buildings</div>
      <Container fluid>
        <Row className="flex-nowrap">
          <Col sm={3} className="p-0">
          <img src={Building} alt="Building" className="img-building"/>
          </Col>
          <Col className="display-6">
              <div>Sensirion Ltd</div>
              <div>Laubisrütistrasse 50</div>
              <div>8712 Stäfa</div>
              <div>Swiss</div>
          </Col>
        </Row>
      </Container>
      <div className="h2 mb-2 mt-5">Rooms</div>
      {rooms.map((room) => <div>{room.label}</div>)}
    </div>
  );
};

export default memo(Settings);
