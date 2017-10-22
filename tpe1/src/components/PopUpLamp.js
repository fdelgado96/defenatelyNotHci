import  React from "react";
import api from '../api';
import {Form, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { CirclePicker } from 'react-color';


import "../css/activationSlider.css"
import "../css/PopUp.css"
import "../css/Slider.css"

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

    handleStatusChange(){
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


        api.devices.putDevice(this.state.id,"changeBrightness",[this.state.brightness])
        .always(()=>
            api.devices.putDevice(this.state.id,"changeColor",[this.state.color.substring(1)])
                .always(()=> {
                    if (this.state.status === "on") {
                        api.devices.putDevice(this.state.id, "turnOn", []);
                        console.log("in if: " + this.state.status);
                    }
                    else
                        api.devices.putDevice(this.state.id, "turnOff", []);
                })
        );


        this.props.closeModal();
    }


    render(){
        console.log(this.state.status)
        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="popup-item">
                        <h6>Brightness</h6>
                        <input type="range" className="input-group form-control-range" value={this.state.brightness} name="brightness" min={this.state.minBrightness} max={this.state.maxBrightness} onChange={this.handleBrightnessChange}/>
                    </div>
                    <div className="popup-item">
                        <h6>Activar</h6>
                        <div className="input-group">
                            <label className="switch active">
                                <input type="checkbox" name="activarLampara"  checked={this.state.status === "on" ? "checked" : ""} onChange={this.handleStatusChange}/>
                                <span className="slider round"/>
                            </label>
                        </div>
                    </div>
                    <div className="popup-item">
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