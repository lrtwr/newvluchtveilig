import React from "react";
import ApiService from "../services/ApiService";

class AreaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
    };
  }

  componentDidMount() {
    ApiService.getAreas().then((Response) => {
      this.setState({ areas: Response.data });
      console.log(this.Response.data);
    });
  }

  handleDelete(id) {
    // ApiService.deleteArea(id);
    console.log(id);
    // ApiService.getAreas().then((Response) => {
    //     this.setState({areas: Response.data})
    // });
  }

  render() {
    return (
      <div>
        <h1 className="text-center"> Area List </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Area Id</td>
              <td>Area Name</td>
              <td>Area Capacity</td>
              <td>Area AreaSqm</td>
              <td>Area Width</td>
              <td>Area Type ID</td>
              <td>
                <submit>submit</submit>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.areas.map((area) => (
              <tr key={area.id}>
                <td>{area.id}</td>
                <td>{area.name}</td>
                <td>{area.capacity}</td>
                <td>{area.areaSqm}</td>
                <td>{area.width}</td>
                <td>{area.areatype_id}</td>
                <td>
                  <button onclick={this.handleDelete(area.id)}>
                    delete id: {area.id}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AreaComponent;
