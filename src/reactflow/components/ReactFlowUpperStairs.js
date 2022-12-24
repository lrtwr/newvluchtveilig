import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as t from "../../tools/LeerTools.tsx";
import { useAsyncGetById} from "../../tools/useAsync";
import * as select from "../../infrastructuur/InfraSelect.tsx";
import { onSubmit, onError, onLoading, onDelete } from "../../infrastructuur/InfraEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../../infrastructuur/InfraFormTools";

let yup = require("yup");

const defaultValues = { name: "stair" };
const yupSchema = yup.object().shape({
  // name: yup.string().required(),
});

export default function ReactFlowUpperStairs(props) {

  props = gatherProps(props, "stair", defaultValues, yupSchema);
   const form = useFormStandard(props);
  const result = useAsyncGetById(props.tableName,props.id, (response, error) => {
      if (response) form.reset(response?.data);
      if(error)t.a("error",error);
    }
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
                label="Naam van de ruimte"
                fieldName="name"
                errors={form.errors}
                errorMessage="Area moet ingevuld zijn!"
                message="Area Name description">
                </ColLabelControlGroup>
            </Row>
            <Row>
            <ColGroep>
                <Form.Label>Trap type capaciteit</Form.Label>
                <select.SelectStairsCapacityType
                  {...form.register("stairscapacitytype_id")}
                  model={result.data}
                  onChange={(e) => form.setValue("stairscapacitytype_id", e.value )}
                />
              </ColGroep>
              <ColGroep>
                <Form.Label>Trap type hoogte</Form.Label>
                <select.SelectStairsHeightType
                  {...form.register("stairsheighttype_id")}
                  model={result.data}
                  onChange={(e) => form.setValue("stairsheighttype_id", e.value )}
                />
              </ColGroep>
            </Row>
            <Row>
            <ColGroep>
          <Form.Label>Huidige ruimte</Form.Label>
          <select.SelectLowerStairArea
            {...form.register("lower_stair_area")}
            model={result.data}
            disabled={true}
            defaultValues={props.defaultValues}
            defaultValue={props.defaultValues.lower_stair_area}
            onChange={(e) => form.setValue("lower_stair_area", { id: e.value })}
          />
        </ColGroep>
        <ColGroep>
          <Form.Label>Trap naar bovenruimte</Form.Label>
          <select.SelectUpperStairArea
            {...form.register("upper_stair_area")}
            disabled={false}
            model={result.data}
            defaultValues={props.defaultValues}
            defaultValue={props.defaultValues.upper_stair_area}
            onChange={(e) => form.setValue("upper_stair_area", { id: e.value })}
          />
        </ColGroep>
            </Row>
            <Row>
            <ColGroep>
                <Button type="submit">Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button hidden={(props.id==0)?true:false} onClick={(e)=>onDelete(e, form.getValues(), props) }>Delete</Button>
            </ColGroep>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  );

  if (result.error) return onError(result.error);
  return result.isLoaded ? FormBody() : onLoading;
}
