import axios from "axios";
import Config from "../Config.json";
import * as t from "../tools/LeerTools.tsx";
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
class ApiService {
  static async getAll(table, callback = (response, error) => {}) {
    return await axios
      .get(Config.api.url + table)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i] = addStaticTables(response.data[i]);
        }
        callback(response, null);
        return response;
      })
      .catch((error) => {
        callback(null, error);
        return error;
      });
  }

  static async post(table, model, callback = (response, error) => {}) {
    return await axios
      .post(Config.api.url + table, model)
      .then((response) => {
        t.setSesMemObj("LastSavedRecord" + table, response.data);
        callback(response, null);
        return response;
      })
      .catch((error) => {
        callback(null, error);
        return error;
      });
  }

  static async postSelect(table, fields, callback = (response, error) => {}) {
    return await axios
      .get(Config.api.url + table + "/" + fields.id)
      .then((response) => {
        let data = response.data;
        for (let x in fields) {
          data[x] = fields[x];
        }
        axios
          .post(Config.api.url + table, data)
          .then((response) => {
            callback(response, null);
            return response;
          })
          .catch((error) => {
            callback(null, error);
            return error;
          });
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  static async getById(table, id, callback = (response, error) => {}) {
    return await axios
      .get(Config.api.url + table + "/" + id)
      .then((response) => {
        response.data = addStaticTables(response.data);
        callback(response, null);
        return response;
      })
      .catch((error) => {
        callback(null, error);
        return error;
      });
  }

  //He geen error afhandeling wel een leeg error object als het goed gaat
  static async deleteById(table, id, callback = (response, error) => {}) {

    return await axios
      .delete(Config.api.url + table + "/" + id)
	  .then(response=>callback({status:"ok"},null))
      .catch((error) => {
        if (Object.keys(error).length>0) {
          console.log("Foutje in tabel " + table + " met id:" + id);
        }
        t.c("callback", callback.toString())
        callback(null, error);
        t.a("hoi error5")
        if(error)return error;
      });
  }
}

export default ApiService;
