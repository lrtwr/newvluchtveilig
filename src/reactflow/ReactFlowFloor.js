import * as t from "../tools/LeerTools.tsx";
import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { MiniMap, Controls, Background } from "reactflow";
import { useNodesState, useEdgesState } from "reactflow";
import { useAsyncGetAll } from "../tools/useAsync";
import api from "../services/ApiService";
import { onError } from "../infrastructuur/InfraEvents";
import { createOneNode } from "./ReactFlowFloorNodes";
import { nodeTypes } from "./ReactFlowFloorNodeTypes";
import { edgeTypes } from "./ReactFlowFloorEdgeTypes";
import { addBaseEdge } from "./ReactFlowFloorEdges";
import { ReactFlowSideBar } from "./ReactFlowSideBar";
import ModalLarge, {deleteModalLarge} from "../infrastructuur/ModalLarge";
import ModalYesNo from "../infrastructuur/ModalYesNo";
import AreaForm from "../components/AreaForm";

import DoorListForm from "./components/DoorListForm";
import RFUpperConnectForm from "./components/ReactFlowUpperStairs";
import RFLowerConnectForm from "./components/ReactFlowLowerStairs";
import staticTables from "../services/staticTables.json";

export default function ReactFlowFloor() {
  //Setup variables
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeClicked, setNodeClicked] = useState({});
  const [selectedFloor, setSelectedFloor] = useState(
    t.getSesMemObj("SelectedFloor")
  );
  const [currentAreas, setCurrentAreas] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //Get the Floors, Areas, Stairs and Doors
  const resFloor = useAsyncGetAll("floor");
  const resArea = useAsyncGetAll("area");
  const resDoor = useAsyncGetAll("door");
  const resStair = useAsyncGetAll("stair");

  useEffect(() => {
    if (resArea.isLoaded && resStair.isLoaded) {
      t.connectOneToManyJSObjects(
        resArea.data,
        resStair.data,
        "upper_stair_area"
      );
      t.connectOneToManyJSObjects(
        resArea.data,
        resStair.data,
        "lower_stair_area"
      );

      const floorAreas = resArea.data.filter((area) => {
        return area?.floor?.id == selectedFloor.id;
      });
      const tmpNodes = [];

      floorAreas.forEach((area) => {
        if (area.areatype_id) {
          let node = createOneNode(
            staticTables.areatype[area.areatype_id - 1].shortname,
            area,
            () => onNodeDelete(area),
            () => onUpperAreaConnectStart(area),
            () => onLowerAreaConnectStart(area)
          );
          tmpNodes.push(node);
        }
      });

      setNodes(tmpNodes);
      setCurrentAreas(floorAreas);
    }
  }, [resArea.isLoaded, resStair.isLoaded]);

  useEffect(() => {
    if(!resDoor.isLoaded)return
    const selectedFloor = t.getSesMemObj("SelectedFloor");
    const floorDoors = resDoor.data.filter((door) => {
      return door?.from_area?.floor?.id == selectedFloor?.id;
    });

    const edgeIds=new t.DynamicClass();
  

    floorDoors.map((door)=>{
      const from_id = door.from_area.id;
      const to_id = door.to_area.id;

      let edgeId="";
      if(from_id>to_id)edgeId=""+from_id+"_"+to_id+""
      else edgeId=""+to_id+"_"+from_id+""

      if(!edgeIds[edgeId])edgeIds[edgeId]=[];
      edgeIds[edgeId]=[...edgeIds[edgeId],door]

      t.c(Object.keys(edgeIds[edgeId]).length);
    })
    let tmpEdges = [];

    Object.keys(edgeIds).map(key=>{
      const ids=key.split("_");
      const data = {id:edgeIds[key][0].id, name:edgeIds[key][0].name}
      if (edgeIds[key].length>1){
        data.name=""+edgeIds[key].length+" deuren"
      }
      tmpEdges = addBaseEdge(
        { source: ids[0], target: ids[1], data: data },
        () => onEdgeDelete({text:"fake object onEdgeDelete op den duur weghalen"}),
        tmpEdges
      ); }
    )

    setEdges(tmpEdges);
    window.edges = tmpEdges;
  },[resDoor.isLoaded])

  const removeNode = useCallback(
    (node) => {
      setNodes((nds) => nds.filter((nde) => nde.id != node.id));
    },
    [nodes]
  );

  const removeEdge = useCallback(
    (edge) => {
      setEdges((edg) => edg.filter((edg) => edg.id != edge.id));
    },
    [edges]
  );

  const onNodeClick = useCallback((event, node) => {
    setNodeClicked(node);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDragStop = useCallback(
    (e, node) => {
      api.postSelect("area", {
        id: node.id,
        x: node.position.x,
        y: node.position.y,
      });
    },
    [nodes]
  );

  const onNodeDelete = useCallback((area) => {
    resStair.execute((response) => {
      if (response) {
        const stairs = response.data;
        resArea.execute((response) => {
          if (response) {
            const newArea = response.data.filter((ar) => {
              return ar.id === area.id;
            })[0];
            nodeDeleteVervolg(newArea, stairs);
          }
        });
      }
    });
  });

  const nodeDeleteVervolg = (area, stairs) => {
    const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));
    root.render(
      <ModalYesNo
        header={area.name}
        body="Wilt u deze ruimte verwijderen?"
        cancelText="No"
        confirmText="Yes"
        exec={async () => {
          const deleteStairsArray = [];
          stairs.forEach(async (stair) => {
            if (stair?.upper_stair_area?.id === area?.id) {
              deleteStairsArray.push(stair.id);
            } else if (stair?.lower_stair_area?.id === area?.id) {
              deleteStairsArray.push(stair.id);
            }
          });

          const deleteApis = [];
          deleteStairsArray.forEach((id) =>
            deleteApis.push(
              new Promise((response, error) => {
                api.deleteById("stair", id).catch((response, error) => {
                  api.deleteById("stair", id);
                });
              })
            )
          );

          let relatedEdges = null;
          setEdges((eds) => {
            relatedEdges = eds.filter(
              (edge) => edge.source == area.id || edge.target == area.id
            );
            return [...eds];
          });
          relatedEdges.forEach((edge) => {
            deleteApis.push(
              new Promise((response, error) =>
                api
                  .deleteById("door", edge.id)
                  .catch((response, error) => api.deleteById("door", edge.id))
              )
            );
          });
          deleteApis.push(
            new Promise((response, error) =>
              api
                .deleteById("area", area.id)
                .catch((response, error) => api.deleteById("area", area.id))
                .catch((response, error) => api.deleteById("area", area.id))
                .catch((response, error) => api.deleteById("area", area.id))
            )
          );

          relatedEdges.forEach((edge) => {
            setEdges((edg) => edg.filter((edg) => edg.id != edge.id));
          });
          removeNode({ id: area.id });
          //Tja, waarom werkt het verwijderen van een node hiermee wel?
          //Mijn verklaring:
          //De db heeft niet op tijd door dat de foreignkey data die verwijderd
          //moet zijn voor dat je dit record verwijderd.
          //Door de timer heeft de db die tijd wel.
          //Is er een betere verklaring?
          //Betere oplosing: in Java Spring JPA een cascaded delete maken.
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 200))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 400))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 600))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 800))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 1000))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 2000))
          );
          deleteApis.push(
            new Promise(setTimeout(() => api.deleteById("area", area.id), 3000))
          );
          t.promiseAllAsync(deleteApis);
          window.location.reload(false);
        }}
      />
    );
  };

  const onEdgeDelete = useCallback((door) => {
    const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));
    root.render(
      <ModalYesNo
        header={door.name}
        body="Wilt deze deur verwijderen?"
        cancelText="No"
        confirmText="Yes"
        exec={async () => {
          api.deleteById("door", door.id);
          removeEdge(door);
          // window.location.reload(false);
        }}
      />
    );
  });

  const onNodeDoubleClick = useCallback(
    (e, node) => {
      const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
      root.render(
        <ModalLarge
          header="Vul de area informatie in"
          render={() =>
            new AreaForm({
              id: node.id,
              render: onNodeDoubleClickVervolg,
            })
          }
        />
      );
    },
    [nodes]
  );

  const onNodeDoubleClickVervolg = (e, node) => {
    nodes.forEach((nde) => {
      if ("" + nde.id === "" + node.id) {
        nde.data = { ...nde.data, name: node.name };
      }
    });
    setNodes([...nodes]);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeInfo = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
        floor: { id: selectedFloor?.id },
      });
      nodeInfo.type = event.dataTransfer.getData("application/reactflow");
      let defaultValues = {
        floor: t.getSesMemObj("SelectedFloor"),
        x: nodeInfo.x,
        y: nodeInfo.y,
      };

      switch (nodeInfo.type) {
        case "SBC":
          defaultValues = {
            ...defaultValues,
            areatype_id: staticTables.areatype[0].id,
          };
          break;
        case "Doorgang":
          defaultValues = {
            ...defaultValues,
            areatype_id: staticTables.areatype[1].id,
          };
          break;
        case "Trap":
          defaultValues = {
            ...defaultValues,
            areatype_id: staticTables.areatype[2].id,
          };
          break;
        case "Exit":
          defaultValues = {
            ...defaultValues,
            areatype_id: staticTables.areatype[3].id,
          };
          break;
        default:
          return;
          break;
      }
      const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));

      root.render(
        <ModalLarge
          header="Vul de area informatie in"
          render={() =>
            new AreaForm({
              id: "0",
              render: onDropVervolg,
              defaultValues: defaultValues,
              renderProperties: nodeInfo,
            })
          }
        />
      );
    },
    [reactFlowInstance, nodes]
  );

  const onDropVervolg = useCallback(
    (position, area) => {
      const node = createOneNode(
        position.type,
        area,
        () => onNodeDelete(area),
        () => onUpperAreaConnectStart(area),
        () => onLowerAreaConnectStart(area)
      );
      setNodeClicked(node);
      setNodes([node, ...nodes]);
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params) => {
      const defaultValues = {
        from_area: { id: params.source },
        to_area: { id: params.target },
      };
      const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
      root.render(
        <ModalLarge
          header="Vul de area informatie in"
          closeButton={false}
          render={() =>
            DoorListForm({
              defaultValues: {
                from_area: { id: params.source },
                to_area: { id: params.target },
              },
              render: onEdgeConnectVervolg,
              renderProperties: {
                source: params.source,
                target: params.target,
              },
            })
          }
        />
      );
    },
    [reactFlowInstance, nodes]
  );

  const onEdgeConnectVervolg = useCallback(
    (params, doors) => {
      t.c("onEdgeConnectVervolg");


      setEdges((eds) => {
        let tmpEdges = [...eds];
        t.c("voor" , tmpEdges.length);

        doors.data.map((door)=>{
          tmpEdges =tmpEdges.filter((edg) => edg.id != door.id)
          t.c(" na", tmpEdges.length);
        })


        let data={id:0,name:""};
        if (doors.data.length>0)data =doors.data[0];

        const multipleDoorIds=[];
        doors.data.map(door=>{
            multipleDoorIds.push(door.id);
        });
        if (doors.data.length>1) data.name=multipleDoorIds.length+" deuren."
        tmpEdges = addBaseEdge(
          { ...params, data:data
          },
          () => onEdgeDelete({text:"Dit is een fake object. OnEdgeDelete kan uiteindelijk verwijderd worden."}),
          tmpEdges
        );

        // window.edges = tmpEdges;
        return tmpEdges;
      });
    },
    [setEdges]
  );

  // const onEdgeDoubleClickVervolg = (e, edge) => {
  //   t.c(edge)
  //   edges.map((edg) => {
  //     if ("" + edg.id === "" + edge.id) {
  //       edg.data = { ...edg.data, name: edge.name };
  //     }
  //   });
  //   setEdges([...edges]);
  // };
  ///////////////
  // Edge events
  ///////////////
  const onEdgeDoubleClick = useCallback(
    (e, edge) => {
      const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
      root.render(
        <ModalLarge
        closeButton={false}
          header="Vul de area informatie in"
          render={() =>
            DoorListForm({
              defaultValues: {
                from_area: { id: edge.source },
                to_area: { id: edge.target },
              },
              render: onEdgeConnectVervolg,
              renderProperties: {
                source: edge.source,
                target: edge.target,
              },
            })
          }
        />
      );
    },
    [edges]
  );



  // Stairs events
  const onUpperAreaConnectStart = useCallback((area) => {
    resStair.execute((response, error) => {
      if (response) {
        let currentStair = [];
        let stairId = 0;
        response.data.forEach((stair) => {
          if (area.id === stair?.lower_stair_area?.id) {
            currentStair.push(stair);
          }
        });
        if (currentStair.length > 0) stairId = currentStair[0].id;
        upperAreaConnectStartVervolg(area, stairId);
      }
    });
  });

  const onLowerAreaConnectStart = useCallback((area) => {
    resStair.execute((response, error) => {
      if (response) {
        let currentStair = [];
        let stairId = 0;
        response.data.forEach((stair) => {
          if (area.id === stair?.upper_stair_area?.id) {
            currentStair.push(stair);
          }
        });
        if (currentStair.length > 0) stairId = currentStair[0].id;
        lowerAreaConnectStartVervolg(area, stairId);
      }
    });
  });

  const upperAreaConnectStartVervolg = useCallback((area, stairId) => {
    const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
    root.render(
      <ModalLarge
        header="Kies de trapverbindings naar de bovenruimte."
        render={() =>
          new RFUpperConnectForm({
            id: stairId,
            render: onUpperAreaConnectVervolg,
            defaultValues: { lower_stair_area: area },
            renderProperties: {},
          })
        }
      />
    );
  });

  const lowerAreaConnectStartVervolg = useCallback((area, stairId) => {
    const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
    root.render(
      <ModalLarge
        header="Kies de trapverbindings naar de benedenruimte."
        render={() =>
          new RFLowerConnectForm({
            id: stairId,
            render: onLowerAreaConnectVervolg,
            defaultValues: { upper_stair_area: area },
            renderProperties: {},
          })
        }
      />
    );
  });

  const changeNodeData = useCallback(
    (node, data) => {
      let nods = undefined;
      setNodes((nds) => (nods = [...nds]));
      const filterNode = nods.filter((nde) => {
        return node.id == nde.id;
      });
      const nodeKaal = { ...filterNode[0] };
      nodeKaal.data = { ...nodeKaal.data, ...data };
      nods = nods.filter((nde) => {
        return node.id != nde.id;
      });
      setNodes([nodeKaal, ...nods]);
    },
    [nodes, setNodes]
  );

  const onUpperAreaConnectVervolg = useCallback((props, stair) => {
    switch (stair.id) {
      case -1:
        if (stair?.error)
          onError({
            source: "Delete a stairs",
            tableName: "stair",
            error: stair?.error,
          });
        break;
      case 0:
        if (stair?.oldModel?.lower_stair_area) {
          const areaId = stair?.oldModel?.lower_stair_area?.id;
          changeNodeData({ id: areaId }, { upperAreaName: "Geen" });
        }
        break;
      default:
        if (stair?.lower_stair_area) {
          const areaId = stair?.lower_stair_area?.id;
          changeNodeData(
            { id: areaId },
            { upperAreaName: stair?.upper_stair_area?.name }
          );
        }
        break;
    }
  });

  const onLowerAreaConnectVervolg = useCallback((props, stair) => {
    switch (stair.id) {
      case -1:
        if (stair?.error)
          onError({
            source: "Delete a stairs",
            tableName: "stair",
            error: stair?.error,
          });
        break;
      case 0:
        if (stair?.oldModel?.upper_stair_area) {
          const areaId = stair?.oldModel?.upper_stair_area?.id;
          changeNodeData({ id: areaId }, { lowerAreaName: "Geen" });
        }
        break;
      default:
        if (stair?.upper_stair_area) {
          const areaId = stair?.upper_stair_area?.id;
          changeNodeData(
            { id: areaId },
            { lowerAreaName: stair?.lower_stair_area?.name }
          );
        }
        break;
    }
  });

  return (
    <>
      {/* <h1>{resStair.data.length}&nbsp;{JSON.stringify(resStair.isLoaded)}</h1> */}
      <div
        className="ReactFlowStyle"
        style={{ height: "calc(100vh - 330px)", width: "calc(97.3vw+10px)" }}>
        <ReactFlowProvider>
          <ReactFlowSideBar />
          <div className="wrapper" ref={reactFlowWrapper}></div>
          <ReactFlow
            snapToGrid={true}
            fitView
            fitViewOptions={{ padding: 1 }}
            attributionPosition="bottom-right"
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            onConnect={onConnect}
            deleteKeyCode={400}
            onNodeDoubleClick={onNodeDoubleClick}
            onEdgeDoubleClick={onEdgeDoubleClick}>
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
}
