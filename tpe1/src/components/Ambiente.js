import React from 'react';
import Dispositivos from "./Dispositivos";
class Ambiente extends React.Component {
    constructor(props){
        super(props)
        this.state ={id: props.id} //por props viene el tipo de ambiente y se renderiza ese ambiente
    }
    render(){
        return (
            <div>
                <div className="container row">
                    <div className="col-lg-6">
                        <h1>Dispositivos</h1>
                        <Dispositivos id={this.state.id} />
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <h1>Funciones Personalizadas</h1>
                            {/*<FunscionsPersonalizadas idAmbiente={this.state.id} />*/}
                        </div>
                        <div className="row">
                            <h1>Rutinas</h1>
                            {/*<Rutinas idAmbiente={this.state.id} />*/}
                        </div>
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