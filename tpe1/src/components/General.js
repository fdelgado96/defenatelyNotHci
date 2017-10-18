import React, {Component} from 'react';
import Menu from './Menu';

export default class General extends Component {
    constructor(props) {
        super(props);

        this.setView = this.setView.bind(this);
        this.state = {
            activeView: "menu"
        };
    }
    setView(view) {
        this.setState({
            activeView: view
        });
    }
    render() {
        switch (this.state.activeView) {
            case "menu":
                return <Menu callback={this.setView}/>;
            case "iluminacion":
                return <h1>Iluminación</h1>;
            case "temperatura":
                return <h1>Temperatura</h1>;
            case "automatizacion":
                return <h1>Automatización</h1>;
            default:
                return <h1>La cagamo</h1>;
        }
    }
}
