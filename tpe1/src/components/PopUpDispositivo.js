
import * as React from "react";
import api from '../api';
import "../css/PopUpDispositivo.css"

class PopUpDispositivo extends React.Component{
 constructor(props){
     super(props);
     this.state = {actions: []};
     api.room.getDeviceType(props.typeId)
         .done((data)=>{
         this.setState({actions: data.device.actions});
         })

 }

 render(){
     console.log(this.state.actions);
     return(
         <div>
             <Sliders actions={this.state.actions}/>
             <Buttons actions={this.state.actions}/>
             <TextInputs actions={this.state.actions}/>
         </div>
     );
 }
}

function Sliders(props) {

    const listSliders =  props.actions.map((action)=>{
        if(action.return.type === "number")
            return  <input type="range" name={action.name} min={action.maxValue} max={action.minValue}/>
    });

    return(
        <ul>{listSliders}</ul>
    );
}

function Buttons(props) {


    const listButtons =  props.actions.map((action)=>{
        if(action.return.type === "boolean") {
            return (
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">{action.name}</span>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span class="slider"/>
                    </label>
                </div>
            );
        }
    });

    return(
        <ul>{listButtons}</ul>
    );
}

function TextInputs(props) {

    const listInputs =  props.actions.map((action)=>{
        if(action.return.type === "string") {
            return (
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">{action.name}</span>
                    <input type="text" class="form-control" placeholder={action.name} aria-describedby="basic-addon1"/>
                </div>
            );
        }
    });

    return(
        <ul>{listInputs}</ul>
    );
}

export default PopUpDispositivo;