import React from 'react';
import ambientes from '../images/ambientes.png';
import gears from '../images/gears.png';
import dispositivos from '../images/dispositivos.png';
import '../css/Menu.css';
import AdminAmbientes from "./AdminAmbientes";

function MenuItem(props) {
    return (
        <div className="col-md-3 menu-item" onClick={props.onClick}>
            <img src={props.img} className="menu-img" alt="img" />
            <h3 className="menu-text">{props.title}</h3>
        </div>
    );
}

function Menu(props) {
    return (
        <div className="container full-page">
            <div className="row menu-container align-items-center justify-content-md-center">
                <MenuItem title="ADMINISTRAR AMBIENTES" img={ambientes} onClick={()=> props.callback("ambientes")} />
                <MenuItem title="ADMINISTRAR DISPOSITIVOS" img={dispositivos} onClick={()=> props.callback("dispositivos")} />
                <MenuItem title="AUTOMATIZACIÓN" img={gears} onClick={()=> props.callback("automatizacion")} />
            </div>
        </div>
    );
}
export default Menu;