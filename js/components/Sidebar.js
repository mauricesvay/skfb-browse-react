import React from 'react';
import { Link } from 'react-router';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="sidebar">
                {/*
                <div className="navigation-login section animated fadeInLeft">
                    <ul className="sidebar-menu">
                        <li className="item">{this.props.loginComponent}</li>
                    </ul>
                </div>
                */}
                <div className="navigation-main section animated fadeInLeft">
                    <ul className="sidebar-menu">
                        <li className="item"><Link activeClassName="active" to="/staffpicks"><i className="icon ion-ios-heart"></i> Staffpicks</Link></li>
                        <li className="item"><Link activeClassName="active" to="/popular"><i className="icon ion-connection-bars"></i> Popular</Link></li>
                        <li className="item"><Link activeClassName="active" to="/recent"><i className="icon ion-ios-clock"></i> Recent</Link></li>
                    </ul>
                </div>
                <div className="navigation-categories section animated fadeInLeft">
                    <h2 className="sidebar-title">
                        Categories
                    </h2>
                    <ul className="categories sidebar-menu">
                        <li className="item"><Link activeClassName="active" to="/category/71260eecdab14a92859a1630e69b5e59">3D Scans</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/7b69e7e004ab4e468fa11350a9e9dbb4">Animal</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/7c8e6d2ef6e34acfafb4dfdd2eac8e9a">Architecture</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/c92452986e70422ca2c6552835a89882">Characters</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/232cf6b0e479418fb9845165ea855ff7">Games</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/528c1d6ede944cf685b2b36eb595f26d">Miscellaneous</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/dccdb5378e924075aaee17288b6b2df1">Objects</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/277778eda2ec467cb6e028b85682ffd3">Printable</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/04b6d4d0e43c403f8f226c374b5381ea">Scenes</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/e4a6ff21ea0042ff9f0f64db2d0adaec">Science</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/dbe6cb768f2d4b31ba1611d3229d7431">Vegetal</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/cf442dbc806b432d9e13f4dc3b1df0c0">Vehicles</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;
