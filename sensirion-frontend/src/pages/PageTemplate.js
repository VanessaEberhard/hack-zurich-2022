import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const PageTemplate = ({ sidebarElements, children }) => {
  return (
    <Container fluid>
      <Row className="flex-nowrap">
        <Col sm={2} className="px-sm-2 px-0 sidebar">
          <div className="d-flex align-items-center justify-content-center px-3 pt-2 full-height-sidebar">
            <Sidebar navElements={sidebarElements} />
          </div>
        </Col>
        <Col sm={10} className="p-5">{children}</Col>
      </Row>
    </Container>
  );
};

export default PageTemplate;
