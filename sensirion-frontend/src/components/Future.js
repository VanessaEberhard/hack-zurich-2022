import { memo, useCallback, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const formInputsFields = [
  {
    label: "tvoc",
    placeholder: "Enter tvoc",
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

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(formInput);
  }, [formInput]);

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
      <Form onSubmit={handleSubmit}>
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
            <Form.Label className="mb-0">{inputFields.label}</Form.Label>
            <Form.Control type="text" placeholder={inputFields.placeholder} />
          </Form.Group>
        ))}
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default memo(Future);
