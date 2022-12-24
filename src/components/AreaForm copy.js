import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import t, { FormTextError } from "../infrastructuur/LeerTools.js";
import { useAsyncGet } from "../infrastructuur/useAsync";
import * as select from "../infrastructuur/LeerSelect.tsx";
import { onSubmit, onError, onLoading } from "../infrastructuur/LeerEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../infrastructuur/LeerFormTools";

let yup = require("yup");

const defaultValues = { name: "area" };
const yupSchema = yup.object().shape({
  // name: yup.string().required(),
  // width: yup.number().positive().required(),
  // areaSqm: yup.number().required().positive(),
  // capacity: yup.number().required().positive(),
});

export default function AreaForm(props) {
  props = gatherProps(props, "area", defaultValues, yupSchema);

  const form = useFormStandard(props);

  const result = useAsyncGetAll(props.tableName,props.id,
    (response, error) => form.reset(response.data)
);

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
            <FormTextError
              fieldName={props.fieldName}
              errors={props.errors}
              errorMessage={props.errorMessage}>
              {props.message}
            </FormTextError>
          </Form.Group>
        </Col>
      </>
    );
  };

  const FormBody = () => (
    <>
      <div className="formBody">
        <Form onSubmit={form.handleSubmit((e) => onSubmit(e, props), onError)}>
          <Form.Control
            readOnly
            {...form.register("id", { valueAsNumber: true })}
            placeholder="id"
            hidden
          />
          <Container>
            <Row>
              <ColLabelControlGroup
                label="Name"
                fieldName="name"
                errors={form.errors}
                errorMessage="Area moet ingevuld zijn!"
                message="Area Name description"></ColLabelControlGroup>
            </Row>
            <Row>
              <ColLabelControlGroup
                label="Breedte doorgang"
                fieldName="width"
                errors={form.errors}
                errorMessage="Breedte moet ingevuld zijn!"
                message="Breedte van de doorgang."></ColLabelControlGroup>
              <ColLabelControlGroup
                label="AreaSqm"
                fieldName="areaSqm"
                errors={form.errors}
                errorMessage="Oppervlakte moet ingevuld zijn!"
                message="Oppervlakte van de doorgang."></ColLabelControlGroup>
            </Row>
            <Row>
              <ColLabelControlGroup
                label="Capacity"
                fieldName="capacity"
                errors={form.errors}
                errorMessage="Capaciteit moet ingevuld zijn!"
                message="Capaciteit van de doorgang."></ColLabelControlGroup>
              <ColGroep>
                <Form.Label>Area Type</Form.Label>
                <select.SelectAreaType
                  {...form.register("areatype")}
                  model={result.data}
                  defaultValue={props.defaultValues.areatype}
                  onChange={(e) => form.setValue("areatype", { id: e.value })}
                />
              </ColGroep>
            </Row>
            <Row>
              <ColGroep>
                <Form.Label>Escape Route Type</Form.Label>
                <select.SelectEscapeRouteType
                  {...form.register("escaperoutetype")}
                  model={result.data}
                  onChange={(e) =>
                    form.setValue("escaperoutetype", { id: e.value })
                  }
                />
              </ColGroep>
              <ColGroep>
                <Form.Label>Verdieping</Form.Label>
                <select.SelectFloor
                  {...form.register("floor")}
                  model={result.data}
                  defaultValue={props.defaultValues.floor}
                  onChange={(e) => form.setValue("floor", { id: e.value })}
                />
              </ColGroep>
            </Row>
            <Button type="submit">Save</Button>
          </Container>
        </Form>
      </div>
    </>
  );

  if (result.error) return onError(result.error);
  return result.isLoaded ? FormBody() : onLoading;
}
