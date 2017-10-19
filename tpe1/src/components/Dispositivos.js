import React from 'react';
import api from './Api';

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
        <div class="input-group">
            <span class="input-group-addon" >{props.name}</span>
            <input type="checkbox" checked data-toggle="toggle" id="on/off button"/> //tiene que prender y apagar
            <button type="button" class="btn">
                <span class="glyphicon glyphicon-cog"></span>
            </button>
        </div>
    );
}
export default Dispositivos;
