import  React from "react";
import api from '../api';
import {Form, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { CirclePicker } from 'react-color';


import "../css/activationSlider.css"


class PopUpLamp extends React.Component{
    constructor(props) {
        super(props);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBrightnessChange = this.handleBrightnessChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            minBrightness: 0 ,
            maxBrightness: 100,
            status: "",
            color: '#fff',
            brightness: 0,
            id: props.id
        };

    }

    componentWillMount(){

        console.log(this.props.id)
        api.devices.getState(this.props.id)
            .done((data) => {
                console.log(data);
                this.setState({
                    status: data.result.status,
                    color: "#"+data.result.color,
                    brightness: data.result.brightness
                })
            })
            .fail(()=>{
            console.log("failed")
            })

    }

    handleStatusChange(event){

        if(this.state.status === "on"){
            this.setState({status: "off"});
            console.log("changed to"+this.state.status)
        }
        else{
            this.setState({status: "on"});
            console.log("changed to"+this.state.status)

        }
    }

    handleBrightnessChange(event){
        this.setState({brightness: event.target.value});

    }

    handleColorChange(color){
        this.setState({color: color.hex});
    }

    handleSubmit(event){
        event.preventDefault();

        console.log(this.state.status);
        console.log(this.state.id)
        if(this.state.status === "on") {
            api.devices.putDevice(this.state.id, "turnOn","");
            console.log("in if: "+this.state.status);
        }
        else
            api.devices.putDevice(this.state.id,"turnOff","");

        api.devices.putDevice(this.state.id,"changeBrightness","["+18+"]");
        api.devices.putDevice(this.state.id,"changeColor",JSON.stringify([this.state.color.substring(1)]));
        this.props.closeModal();
    }


    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div>
                        <h6>Brightness</h6>
                        <input type="range" className="input-group form-control-range" name="brightness" min={this.state.minBrightness} max={this.state.maxBrightness} onChange={this.handleBrightnessChange}/>
                    </div>
                    <div>
                        <h6>Activar</h6>
                        <div className="input-group">
                            <label className="switch">
                                <input type="checkbox" name="activarLampara" defaultChecked={this.state.status === "on" ? "checked" : "unchecked"} onChange={this.handleStatusChange}/>
                                <span className="slider round"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h6>Color:</h6>
                        <CirclePicker color={this.state.color} onChangeComplete={this.handleColorChange}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                    <input type="submit" className="btn btn-primary" value="Guardar"/>
                </ModalFooter>
            </Form>
        );

    }
}
export default PopUpLamp;