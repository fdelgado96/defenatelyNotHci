import React from 'react';
import General from './General';
import Ambiente from './Ambiente';
import HelpBoard from './Ayuda';

export default function (props) {
    switch (props.view) {
        case "general":
            return <General />;
        case "ayuda":
            return <HelpBoard />;
        default:
            return <Ambiente id={props.view}/>;
    }
}