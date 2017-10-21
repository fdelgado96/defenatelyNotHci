import React from 'react';
import Dispositivos from "./Dispositivos";
import Funciones from './Funciones';

class Ambiente extends React.Component {
    constructor(props){
        super(props)
        this.state ={id: props.id} //por props viene el tipo de ambiente y se renderiza ese ambiente
    }
    render(){
        return (
            <div>
                <div className="container row mx-auto">
                    <div className="col-lg-6 mx-auto">
                        <h1>Dispositivos</h1>
                        <Dispositivos id={this.state.id} />
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <h1>Funciones Personalizadas</h1>
                        <Funciones room={this.props.id}/>
                    </div>
                </div>
            </div>
        )
    }


}
//
// function GetDispositivos(props) {
//     var room = api.room.get(this.state.id);
//
//
// }


export default Ambiente;