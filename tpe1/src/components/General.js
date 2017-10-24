import React, {Component} from 'react';
import Menu from './Menu';
import Automatizacion from './Automatizacion';
import AdminAmbientes from './AdminAmbientes';
import AdministrarDispositivos from "./AdministrarDispositivos";

export default class General extends Component {
    constructor(props) {
        super(props);

        this.setView = this.setView.bind(this);
        this.ignoreNextUpdate = this.ignoreNextUpdate.bind(this);
        this.state = {
            activeView: "menu"
        };
        this.ignoreUpdate = false;
    }

    componentWillReceiveProps() {
        if(this.ignoreUpdate) {
            this.ignoreUpdate = false;
        }
        else {
            this.setState({
                activeView: "menu"
            });
        }
    }

    ignoreNextUpdate() {
        this.ignoreUpdate = true;
    }

    setView(view) {
        this.setState({
            activeView: view
        });
    }

    render() {
        console.log("RENDEEER");
        switch (this.state.activeView) {
            case "menu":
                return <Menu callback={this.setView}/>;
            case "ambientes":
                return <AdminAmbientes rooms={this.props.rooms} callback={() => {this.ignoreNextUpdate(); this.props.callback()}}/>;
            case "dispositivos":
                return <AdministrarDispositivos/>;
            case "automatizacion":
                return <Automatizacion />;
            default:
                return <h1>La cagamo</h1>;
        }
    }
}
