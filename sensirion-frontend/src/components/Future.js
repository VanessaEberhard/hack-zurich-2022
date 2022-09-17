import axios from "axios";
import { BASE_URL } from "const/env";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const formInputsFields = [
  {
    label: "VOC",
    placeholder: "Enter VOC",
    controlId: "tvoc",
  },
  {
    label: "Volumne flow ventitation system in",
    placeholder: "Enter volumne flow ventitation system in",
    controlId: "volumne_flow_ventitation_system_in",
  },
  {
    label: "Temperature ventilation system used air in",
    placeholder: "Enter temperature ventilation system used air in",
    controlId: "temperature_ventilation_system_used_air_in",
  },
  {
    label: "Consumed meals",
    placeholder: "Enter consumed meals",
    controlId: "consumed_meals",
  },
  {
    label: "Wind speed outdoor estimated",
    placeholder: "Enter wind speed outdoor estimated",
    controlId: "wind_speed_outdoor_estimated",
  },
  {
    label: "Temmperature ventilation system fresh air out",
    placeholder: "Enter temmperature ventilation system fresh air out",
    controlId: "temmperature_ventilation_system_fresh_air_out",
  },
  {
    label: "Temperature ventilation system used air out",
    placeholder: "Enter temperature ventilation system used air out",
    controlId: "temperature_ventilation_system_used_air_out",
  },
];

const Future = () => {
  const [formInput, setFormInput] = useState();
  const [result, setResult] = useState();

  const formRef = useRef();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      formRef.current.reset();
      axios
        .post(
          `${BASE_URL}/future`,
          {
            formInput,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        )
        .then((response) => {
          setResult(response.data.co2);
        });
    },
    [formInput]
  );

  useEffect(() => {
    const controlIds = formInputsFields.map((field) => field.controlId);
    const inputArray = controlIds.reduce((a, v) => ({ ...a, [v]: "" }), {});
    setFormInput(inputArray);
  }, []);

  return (
    <div>
      <div className="h3 mb-3">
        Enter the informations and receive the predicted CO2
      </div>
      <form onSubmit={handleSubmit} ref={(form) => (formRef.current = form)}>
        {formInputsFields.map((inputFields) => (
          <Form.Group
            className="mb-3"
            controlId={inputFields.controlId}
            key={inputFields.controlId}
            onChange={(e) => {
              const copyInput = { ...formInput };
              copyInput[inputFields.controlId] = e.target.value;
              setFormInput(copyInput);
            }}
          >
            <Form.Label className="mb-2">{inputFields.label}</Form.Label>
            <Form.Control type="number" placeholder={inputFields.placeholder} required />
          </Form.Group>
        ))}
        <Container>
          <Row>
            <Col className="p-0">
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Col>
            {result && (
              <Col
                className={
                  400 < result && result < 1000
                    ? "text-success"
                    : result < 2000
                    ? "text-warning"
                    : "text-error"
                }
              >
                <div className="h4">{result}</div>
              </Col>
            )}
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default memo(Future);
