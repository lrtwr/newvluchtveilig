import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Config from "../Config.json";
import * as t from "./LeerTools.tsx";
import staticTables from "../services/staticTables.json";

const addStaticTables = (data) => {
  data = { ...data };
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (key.endsWith("_id")) {
      const newForeignTableName = key.split("_")[0];
      const newForeignTable = staticTables[newForeignTableName];
      data[newForeignTableName] = newForeignTable.filter((row) => {
        if (row.id === data[key]) return row;
      })[0];
    }
  });
  return data;
};

export const useAsyncGetAll = (
  tableName,
  callback = (response, error) => {},
  immediate = true
) => {
  const url = Config.api.url + tableName;
  const asyncFunction = async () => await axios.get(url);
  const result = useAsync(asyncFunction, callback, immediate);
  return {
    ...result,
    data: result?.response?.data ? result.response.data : [],
  };
};

export const useAsyncGetById = (
  tableName,
  id = 0,
  callback = (response, error) => {},
  immediate = true
) => {
  const url = Config.api.url + tableName + (id ? "/" + id : "");
  const asyncFunction = async () => {
    if (id == 0) {
      return new Promise((response) => {
        response({});
      });
    } else {
      return await axios.get(url);
    }
  };

  const result = useAsync(asyncFunction, callback, immediate);
  return {
    ...result,
    data: result?.response?.data ? result.response.data : {},
  };
};

export function useAsync(
  asyncFunction,
  callback = (response, error) => {},
  immediate = true
) {
  const [response, setResponse] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const executeWithFirstCallback = useCallback(() => {
    return asyncFunction()
      .then((response) => {
        setIsLoaded(true);
        setResponse(response);
        callback(response, null);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
        callback(null, error);
      });
  }, [asyncFunction]);

  const execute = useCallback(
    (callbackLater = (response, error) => {}) => {
      return asyncFunction()
        .then((response) => {
          setIsLoaded(true);
          setResponse(response);
          callbackLater(response, null);
        })
        .catch((error) => {
          setError(error);
          setIsLoaded(true);
          callbackLater(null, error);
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      executeWithFirstCallback();
    }
  }, []);
  return { executeWithFirstCallback, execute, response, error, isLoaded };
}
