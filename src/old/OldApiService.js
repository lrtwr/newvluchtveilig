import axios from "axios";
import Config from "../Config.json"

class OldApiService {
   constructor(apiUrl){
    this.apiUrl=apiUrl;
   }

  get() {
    return axios.get(this.apiUrl);
  }

  post(model) {
    axios.post(this.apiUrl, model);
  }

  getById(id) {
    return axios.get(this.apiUrl + id);
  }

  deleteId(id) {
    return axios.delete(this.apiUrl + id);
  }
}

export default OldApiService;
