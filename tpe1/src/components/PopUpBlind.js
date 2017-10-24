import  React from "react";
import api from '../api';
import {Button, ButtonGroup, ModalBody, ModalFooter, ModalHeader, Progress} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"

class PopUpBlind extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: "",
            id: props.id,
            blindLevel: 0,
            up: true,
        };
        this.changeBlindState = this.changeBlindState.bind(this);
        this.tick = this.tick.bind(this)
    };

    componentWillMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000 );

        api.devices.getState(this.props.id)
            .done((data) => {
                console.log(data);
                this.setState({
                    status: data.result.status,
                    blindLevel: data.result.level,
                })
            })
            .fail(()=>{
                console.log("failed")
            });
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    changeBlindState(event) {
        event.preventDefault();
        if(this.state.status === "opening" || this.state.status === "closing"){
            //alert
            return;
        }
        let param;
        if(event.target.name === "down") {
            param = "down";
            this.setState({status: "closing"})
        }
        else if(event.target.name === "up") {
            param = "up";
            this.setState({status: "opening"})
        }
        api.devices.putDevice(this.state.id, param,[])
    }

    tick() {
        if (this.state.status === "opening") {
            if (this.state.blindLevel !== 0) {
                this.setState({blindLevel: this.state.blindLevel - 1});
            }
            else {
                this.setState({status: "open"});
            }
        }
        else if (this.state.status === "closing"){
            if (this.state.blindLevel !== 100) {
                this.setState({blindLevel: this.state.blindLevel + 1});
            }
            else {
                this.setState({status: "closed"})
            }
        }
    }
    render(){
        console.log("blindLevel: "+this.state.blindLevel+" status: "+this.state.status);
        return(
            <div>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <h6>Activar:</h6>
                    <ButtonGroup>
                        <Button color="primary" name="up" onClick={this.changeBlindState}>Subir</Button>
                        <Button color="primary" name="down" onClick={this.changeBlindState}>Bajar</Button>
                    </ButtonGroup>
                    <div>
                        <h6>Nivel de las Persianas:</h6>
                        <Progress animated  max="100" value={this.state.blindLevel}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                </ModalFooter>
            </div>
        )
    }
}


export default PopUpBlind;