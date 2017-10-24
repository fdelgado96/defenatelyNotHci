import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../images/logo.png';
import "../css/Header.css"
import GenerateNav from './GenerateNav';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand onClick={()=>this.props.callback("general")} href="#"><img src={logo} className="logo" alt="logo"/><span className="brand">Smart<span className="brand-colored">HOME</span></span></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <GenerateNav active={this.props.active} callback={this.props.callback}/>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}



/*
function Header(props) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <img src="assets\brand\brand.png" width="30" height="30" className="d-inline-block align-top" alt="company logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">GENERAL<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">COCINA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">LIVING</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">DORMITORIOS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">LAVADERO</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">BAÑOS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">ADMINISTRACIÓN</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">AYUDA</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;*/
