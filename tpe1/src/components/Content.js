import React from 'react';
import General from './General';
import Ambiente from './Ambiente';
import HelpBoard from './Ayuda';
import Administracion from './Administracion'

export default function (props) {
    switch (props.view) {
        case "general":
            return <General />;
        case "cocina":
            return <Ambiente id="b398aa66327c56bd"/>;
        case "living":
            return <Ambiente id="0086b49564394504"/>;
        case "dormitorios":
            return <Ambiente id="547822d2b7097623"/>;
        case "lavadero":
            return <Ambiente id="f9cc22698aa3bac8"/>;
        case "baños":
            return <Ambiente id="823c3e8a018eca39"/>;
        case "administracion":
            return <Administracion />;
        case "ayuda":
            return <HelpBoard />;
        default:
            return <h1>Me dio paja hacer todos</h1>;
    }
}