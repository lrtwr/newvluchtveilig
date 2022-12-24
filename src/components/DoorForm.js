import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as t from "../tools/LeerTools.tsx";
import { useAsyncGetById} from "../tools/useAsync";
import * as select from "../infrastructuur/InfraSelect.tsx";
import { onError, onLoading } from "../infrastructuur/InfraEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../infrastructuur/InfraFormTools";
import api from "../services/ApiService";

let yup = require("yup");

const defaultValues = { name: "door" };
const yupSchema = yup.object().shape({
  // name: yup.string().required(),
  // width: yup.number().positive().required(),
  // areaSqm: yup.number().required().positive(),
  // capacity: yup.number().required().positive(),
});

export default function DoorForm(props) {

  
  props = gatherProps(props, "door", defaultValues, yupSchema);
  const form = useFormStandard(props);
  const result = useAsyncGetById(props.tableName, props.id,(response, error) => {
      if (response) {
        form.reset(response?.data);
        if(props.defaultValues?.from_area)form.setValue("from_area",{id:props.defaultValue.from_area.id});
        if(props.defaultValues?.to_area)form.setValue("to_area",{id:props.defaultValue.to_area.id});
      }
    }
  );
  

  const onSubmit = (data, props) => {
    api.post(props.tableName, data, (response, error) => {
      if (response) {
        if (props.render) {
          props.render(props.renderProperties, response.data);
        }
      }
      if (error) {
        onError("onSubmit", props.tableName, error);
      }
    });
  };

  const ColGroep = (props) => (
    <Col>
      <Form.Group className="mb-3">{props.children}</Form.Group>
    </Col>
  );

  const ColLabelControlGroup = (props) => {
    return (
      <>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
              {...form.register(props.fieldName)}
              placeholder={props.label}
            />
            <t.FormTextError
              fieldName={props.fieldName}
              errors={props.errors}
              errorMessage={props.errorMessage}>
              {props.message}
            </t.FormTextError>
          </Form.Group>
        </Col>
      </>
    );
  };

  const ContainerBody = () => (
    <>
      <Row>
        <ColLabelControlGroup
          label="Name"
          fieldName="name"
          errors={form.errors}
          errorMessage="Area moet ingevuld zijn!"
          message="Area Name description"
        ></ColLabelControlGroup>
      </Row>
      <Row>
      <ColGroep>
          <Form.Label>DoorType</Form.Label>
          <select.SelectDoorType
            {...form.register("doortype")}
            model={result.data}
            onChange={(e) => form.setValue("doortype", { id: e.value })}
          />
        </ColGroep>
      </Row>
      <Row>
      <ColGroep>
          <Form.Label>Van Ruimte</Form.Label>
          <select.SelectFromArea
            {...form.register("from_area")}
            model={result.data}
            defaultValue={defaultValues.from_area}
            onChange={(e) => form.setValue("from_area", { id: e.value })}
          />
        </ColGroep>
        <ColGroep>
          <Form.Label>Naar Ruimte</Form.Label>
          <select.SelectToArea
            {...form.register("to_area")}
            model={result.data}
            defaultValue={defaultValues.to_area}
            onChange={(e) => form.setValue("to_area", { id: e.value })}
          />
        </ColGroep>
      </Row>
    </>
  );

  const FormBody = () => (
    <><div className="formBody">
        <Form onSubmit={form.handleSubmit((e) => onSubmit(e, props), onError)}>
        <Container>
          <ContainerBody></ContainerBody>
          <Button type="submit">Save</Button>
        </Container>
      </Form>
    </div></>
  );

  return result.isLoaded ? FormBody() : <p>loading...</p>;
}
