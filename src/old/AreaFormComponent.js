import React from "react";

class AreaFormComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            areas:[]
        }
    }
    
    componentDidMount(){
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event){
        this.setState({value: event.target.value});
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    SBC:
                    <input type="text" name="name"/>
                    <input type="text" name="capacity"/>
                </label>
                <input type="submit" value="submit"/>
            </form>
        )

    }


}
export default AreaFormComponent