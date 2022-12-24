import React, { useState } from "react";
import ApiService from "../services/ApiService";

const NameForm = () => {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [areaSqm, setAreaSqm] = useState('');
    const [width, setWidth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const area = {name, capacity, areaSqm, width};
        ApiService.postArea(area);

        console.log(area);
    }
    return(
        <div className = "NameFrom">

        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Capaciteit:
                <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            </label>
            <label>
                Oppervlakte:
                <input type="text" value={areaSqm} onChange={(e) => setAreaSqm(e.target.value)} />
            </label>
            <label>
                Name:
                <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} />
            </label>



            <input type="submit" value="Submit" />
        </form>
                 {/* {name}    */}
                 {}
        </div>
        );
}

  export default NameForm