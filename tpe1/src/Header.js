import React from 'react';

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

export default Header;