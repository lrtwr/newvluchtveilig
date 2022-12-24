import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import api from "../services/ApiService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import t, { FormTextError } from "../tools/LeerTools.tsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { yupResolver } from "@hookform/resolvers/yup";

let yup = require("yup");

const Schema = yup.object().shape({
  name: yup.string().required(),
  width: yup.number().positive().required(),
  areaSqm: yup.number().required().positive(),
  capacity: yup.number().required().positive(),
});

export default function AreaTypeForm(props) {
  let id = "0";
  const table = "areatype";
  if (props?.id) id = props.id;

  const defaultValues = {};
  const [isLoaded, setIsLoaded] = useState(false);
  const [model, setModel] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });

  const resetAsyncForm = useCallback(async () => {
    if (id != "0" && id != "") {
      await api.getById(table, id, (response, error) => {
        if (response) {
          setModel(response.data);
          reset(response.data);
        }
        if (error) {
        }
      });
    }
    setIsLoaded(true);
  }, [reset]);

  useEffect(() => {
    const fetchData = async () => await resetAsyncForm();
    fetchData();
  }, []);

  const onSubmit = (data) => {
    api.post(table, data);
    document.querySelectorAll(".modal").forEach((el) => {
      el.style.visibility = "hidden";
      el.classList.remove("modal-backdrop");
    });
    document.getElementById("ModalLargeId").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
    window.location.reload(false);
  };

  const onError = (errors) => {
    console.log(errors.name?.message);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {!isLoaded && <p>loading...</p>}
        {isLoaded && (
          <>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...register("name")} placeholder="name" />
                    <FormTextError
                      fieldName="name"
                      errors={errors}
                      errorMessage="Area moet ingevuld zijn!"
                    >
                      Area Name description
                    </FormTextError>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Width</Form.Label>
                    <Form.Control {...register("width")} placeholder="width" />
                    <FormTextError fieldName="width" errors={errors}>
                      Width of the area.
                    </FormTextError>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>AreaSqm</Form.Label>
                    <Form.Control
                      {...register("areaSqm")}
                      placeholder="areaSqm"
                    />
                    <Form.Text className="text-muted">
                      AreaSqm of the area
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      {...register("capacity")}
                      placeholder="capacity"
                    />
                    <Form.Text className="text-muted">
                      Capacity of the area
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">Save</Button>
            </Container>
          </>
        )}
      </Form>
    </>
  );
}