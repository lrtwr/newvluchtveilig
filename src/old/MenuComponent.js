import React from "react";
import ApiService from "../services/ApiService";

class MenuComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            areas:[]
        }
    }
    
    componentDidMount(){

    }

    render (){
        return (
            <div>
                <button onClick={ApiService.postArea}>SBC</button>
            </div>
        )

    }


}
export default MenuComponent