import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import ApiService from "./OldApiService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

export default function AreaDistanceForm(id) {
  const defaultValues = {
    name: "",
    direction: "",
    name: "",
    doorType: "",
    from_area: "",
    to_area: "",
  };
  const apiString = process.env.REACT_APP_BACKEND_URL + "/areadistance/";
  const apiAreaString = process.env.REACT_APP_BACKEND_URL + "/area/";

  // Select (alle drie)
  const [defaultSelectId, setDefaultSelectId] = useState({
    areaFromId: 0,
    areaToId: 0,
  });
  const [selectOptions, setSelectOptions] = useState({
    areaOptions: [],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const api = new ApiService(apiString);
  const apiArea = new ApiService(apiAreaString);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  const resetAsyncForm = useCallback(async () => {
    //Eerst Select boxen verzamelen

    const areas = await apiArea.get();
    console.log(areas);
    const areaOptions = areas.data.map((d) => ({
      value: d.id,
      label: d.name + " " + d.id,
    }));
    selectOptions.areaOptions = areaOptions;

    //Is er een id? bij nee betekent dit new
    if (id != "0" && id != "") {
      //formdata laden
      const result = await api.getById(id);
      console.log(result.data);
      reset(result.data);

      //Select foreign key for select box
       if (result.data["from_area"] != null) {
        defaultSelectId.areaFromId = result.data.from_area.id;
      }
      if (result.data["to_area"] != null) {
        defaultSelectId.areaToID = result.data.to_area.id;
      }
    }

    //Form is ready to render
    setIsLoaded(true);
  }, [reset]);

  useEffect(() => {
    const fetchData = async () => await resetAsyncForm();
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    api.post(data);

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

  const handleDoorTypeSelectChange = (e) => {
    setValue("doortype", { id: e.value });
  };
  const handleFromAreaSelectChange = (e) => {
    setValue("from_area", { id: e.value });
  };
  const handleToAreaSelectChange = (e) => {
    setValue("to_area", { id: e.value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {/* Select: Isloaded principe moet erbij voor select */}
        {!isLoaded && <p>loading...</p>}
        {isLoaded && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control
                {...register("id", { valueAsNumber: true })}
                placeholder="id"
                // hidden
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control {...register("name")} placeholder="name" />
              <Form.Text className="text-muted">Door name</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Direction</Form.Label>
              <Form.Control
                {...register("direction", { valueAsNumber: true })}
                placeholder="direction"
              />
              <Form.Text className="text-muted">Width of the door</Form.Text>
            </Form.Group>


            {/* Select */}

            <Form.Group className="mb-3">
              <Form.Label>From Area</Form.Label>
              <Select
                {...register("from_area", {})}
                id="trueTypeSelect"
                className="input-cont"
                placeholder="Select the fromarea"
                options={selectOptions.areaOptions}
                defaultValue={selectOptions.areaOptions.filter(function (
                  option
                ) {
                  return option.value === defaultSelectId.areaFromId;
                })}
                onChange={handleFromAreaSelectChange}
              ></Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>To Area</Form.Label>
              <Select
                {...register("to_area", {})}
                id="trueTypeSelect"
                className="input-cont"
                placeholder="Select the to area"
                options={selectOptions.areaOptions}
                defaultValue={selectOptions.areaOptions.filter(function (
                  option
                ) {
                  return option.value === defaultSelectId.areaToId;
                })}
                onChange={handleToAreaSelectChange}
              ></Select>
            </Form.Group>

            <Button type="submit">Save</Button>
          </>
        )}
      </Form>
    </>
  );
}
