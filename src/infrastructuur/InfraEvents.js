import api from "../services/ApiService";
import ModalLarge, { deleteModalLarge } from "./ModalLarge";
import ModalMessage from "./ModalMessage";
import ModalYesNo from "./ModalYesNo";
import ReactDOM from "react-dom/client";
import * as t from "../tools/LeerTools.tsx";

export const onSubmit = (data, props) => {
  api.post(props.tableName, data, (response, error) => {
    if (response) {
      deleteModalLarge();
      if (props.render) {
        props.render(props.renderProperties, response.data);
      } else window.location.reload(false);
    }
    if (error) {
      onError("onSubmit", props.tableName, error);
    }
  });
};

export const onDelete = (e, currentModel, props) => {
  e.preventDefault();
  const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));
  root.render(
    <ModalYesNo
      header={props.headerTitle}
      body="Wilt u dit record echt verwijderen?"
      cancelText="No"
      confirmText="Yes"
      exec={() => {
        api.deleteById(props.tableName, props.id, (response, error) => {
          deleteModalLarge();
          if (response) {
            if (props.render) {
              props.render(props.renderProperties, {
                status: "ok",
                id: 0,
                oldModel: currentModel,
              });
            }
          }
          if (error) {
            onError("InfraEvents.Ondelete", props.tableName, error);
            if (props.render) {
              props.render(props.renderProperties, {
                status: "error",
                errorMessage: "Er ging iets fout bij het verwijderen.",
                id: -1,
                error: error,
                oldModel: currentModel,
              });
            }
          }
        });
        // window.location.reload(false);
      }}
    />
  );
};

export const onClickNew = (e, props) => {
  e.preventDefault();
  EditRecord(0, props);
};

export const onClickEdit = (e, props) => {
  e.preventDefault();
  EditRecord(e.target.value, props);
};

const EditRecord = (id, props) => {
  const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
  root.render(
    <ModalLarge
      header={props.headerTitle}
      render={() => props.editForm({ ...props, id: id })}
    />
  );
};

export const onError = (props) => {
  const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
  root.render(
    <ModalLarge
      header={props.headerTitle}
      render={() => ErrorComponent(props)}
    />
  );

  const ErrorComponent = (props) => {
    props = { ...props };
    let error = {};
    if (props?.error) error = JSON.parse(JSON.stringify(props.error));
    const keys = Object.keys(props);

    let errorKeys = [];
    errorKeys = Object.keys(error);
    return (
      <>
        {keys.map(
          (key) =>
            key !== "error" && (
              <p>
                {" "}
                {key}:&nbsp;{JSON.stringify(props[key])}
              </p>
            )
        )}
        {errorKeys.map((key) => (
          <p>
            {key}:&nbsp;{JSON.stringify(error[key])}
          </p>
        ))}
      </>
    );
  };
};

export const onClickDelete = (e, props) => {
  t.c(props);
  e.preventDefault();
  const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));
  root.render(
    <ModalYesNo
      header={props.headerTitle}
      body="Wilt u dit record echt verwijderen?"
      cancelText="No"
      confirmText="Yes"
      exec={() => {
        api.deleteById(props.tableName, e.target.value, (response, error) => {
          if (response) {
            console.log("Het gaat goed:" + JSON.stringify(response.data));
            window.location.reload(false);
          }
          if (error) {
            onError({
              source: "onClickDelete",
              tableName: props.tableName,
              id: props.id,
              error: error,
            });
            console.log("Het gaat fout:" + JSON.stringify(error.response.data));
            window.location.reload(false);
          }
        });
      }}
    />
  );
};

export const onLoading = () => {
  <>
    <p>loading....</p>
  </>;
};
