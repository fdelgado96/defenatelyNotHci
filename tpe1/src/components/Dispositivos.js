import React from 'react';
import api from './api';

class Dispositivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {devices : []};
    }

    componentWillMount(){
        console.log("props id mount " +this.props.id)
        api.room.getDevices(this.props.id)
            .done((data) => {
                console.log(this)
                this.setState({devices : data.devices});
            })
            .fail(() => {console.log("failed")}

            )


    }

   render(){
        console.log(this.state.devices);
       const listDevices = this.state.devices.map((device) =>
           <Dispositivo name={device.name}/>)
       return <ul>{listDevices}</ul>;

   };
}

function Dispositivo(props){

    return(
        <div className="input-group">
            <span className="input-group-addon" >{props.name}</span>
            <label className="switch">
                <input type="checkbox"></input>
                    <span className="slider round"></span>
            </label>
            <button type="button" className="btn">
                <span className="glyphicon glyphicon-cog"></span>
            </button>
        </div>
    );
}
export default Dispositivos;
