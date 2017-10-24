import  React from "react";
import api from '../api';
import {Button, ButtonGroup, Form, Input, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"

class PopUpBlind extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blindDown: false,
            id: props.id,
            actionAvailable: true,
            blindLevel: 0
        };
        this.changeBlindState = this.changeBlindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount(){

        api.devices.getState(this.props.id)
            .done((data) => {
                console.log(data);
                this.setState({
                    status: data.result.status,
                })
            })
            .fail(()=>{
                console.log("failed")
            })

    };

    handleSubmit(event) {
        event.preventDefault();
        let param;
        if(this.state.blindDown)
            param = "down";
        else
            param = "up";
        api.devices.putDevice(this.state.id, param,[])
        this.props.closeModal();
    }

        changeBlindState(){
        if(this.state.blindDown)
            this.setState({blindDown: false});
        else
            this.setState({blindDown: true});
    };

    render(){
        console.log(this.state.blindDown);
        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <h6>Activar:</h6>
                    <div className="input-group">
                        <label className="switch active">
                            <input type="checkbox" name="activarLampara"  checked={!this.state.blindDown ? "checked" : ""} onChange={this.changeBlindState}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                    <div>
                        {/*<h6>Nivel de las Persianas:</h6>*/}
                        {/*<Progress animated value={this.state.blindLevel}/>*/}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                    <input type="submit" className="btn btn-primary" value="Guardar"/>
                </ModalFooter>
            </Form>
        )
    }
}

export default PopUpBlind;