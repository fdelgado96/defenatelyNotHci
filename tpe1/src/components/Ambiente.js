import React from 'react';
import Dispositivos from "./Dispositivos";
import Funciones from './Funciones';
import api from '../api'
import '../css/Ambiente.css'


class Ambiente extends React.Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.state = {      //por props viene el tipo de ambiente y se renderiza ese ambiente
            routines: []
        };
    }

    componentWillMount(){
        this.refresh();
    }

    componentWillReceiveProps(){
        this.refresh();
    }

    refresh() {
        api.routines.list()
            .done((data) => {
                this.setState({
                    routines: data.routines.filter(routine => routine.meta === this.props.id)
                });
            })
            .fail(() => {
                console.log("List Routines Failed")}
            );
    }

    render(){
        return (
            <div className="ambientes">
                <div className="container row mx-auto">
                    <div className="col-lg-6 mx-auto">
                        <h1>Dispositivos</h1>
                        <Dispositivos id={this.props.id}/>
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <h1>Funciones Personalizadas</h1>
                        <Funciones routines={this.state.routines} callback={this.refresh}/>
                    </div>
                </div>
            </div>
        )
    }


}

export default Ambiente;