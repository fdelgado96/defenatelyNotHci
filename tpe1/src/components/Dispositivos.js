import React from 'react';
import api from '../api';
import cog from '../images/cog.png';
import {Modal} from 'reactstrap';
import * as $ from "jquery";
import PopUpLamp from './PopUpLamp';
import PopUpOven from './PopUpOven';


class Dispositivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {devices : []};
    }

    componentWillMount(){
        api.room.getDevices(this.props.id)
            .done((data) => {
                this.setState({devices : data.devices});
            })
            .fail(() => {console.log("failed")}

            )


    }

   render(){
       const listDevices = this.state.devices.map((device) => {
           return (
               <li>
                   <Dispositivo key={device.id} name={device.name} typeId={device.typeId} id={device.id}/>
               </li>
           )
       });
       return <ul>{listDevices}</ul>;

   };
}

class Dispositivo extends React.Component{
    constructor(props){
        super(props)
        this.state = {open: false}
        this.handleClick = this.handleClick.bind(this);
        this.closeModal =this.closeModal.bind(this);
    }

    handleClick()
    {
        this.setState({open:true});
    }

    closeModal = () => this.setState({ open: false })


    render() {
        console.log(this.props.name);

        return(
            <div>

                <div className="input-group">
                    <span className="input-group-addon">{this.props.name}</span>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"/>
                    </label>
                    <button type="button" className="btn" onClick={this.handleClick}>
                        <img src={cog} width="20" alt="cog"/>
                    </button>
                </div>

                <Modal isOpen={this.state.open} onExit={this.closeModal} aria-labelledby={this.props.id+"Modal"}>
                    <PopUpSelector  id ={this.props.id} typeId={this.props.typeId} name={this.props.name}  closeModal ={this.closeModal}/>
                </Modal>

            </div>
        );
    };
}

function PopUpSelector(props){
    switch(props.typeId){
        case "go46xmbqeomjrsjr":
            return <PopUpLamp id={props.id} name={props.name} closeModal={props.closeModal}/>;

        case "im77xxyulpegfmv8":
            return <PopUpOven id={props.id} name={props.name} closeModal={props.closeModal}/>;

        default:
            return <p>no existe el dispositivo</p>
    }

}
export default Dispositivos;

