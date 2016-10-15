import React from 'react';
import { Link } from 'react-router';

let Sidebar = React.createClass({
    render( ) {
        return (
            <div className="sidebar">
                <div className="navigation-main section animated fadeInLeft">
                    <ul className="sidebar-menu">
                        <li className="item">
                            <Link activeClassName="active" to="/staffpicks">
                                <i className="icon ion-ios-heart"></i>
                                Staffpicks</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/popular">
                                <i className="icon ion-connection-bars"></i>
                                Popular</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/recent">
                                <i className="icon ion-ios-clock"></i>
                                Recent</Link>
                        </li>
                    </ul>
                </div>
                <div className="navigation-categories section animated fadeInLeft">
                    <h2 className="sidebar-title">
                        Categories
                    </h2>
                    <ul className="categories sidebar-menu">
                        <li className="item">
                            <Link activeClassName="active" to="/category/animals-creatures">Animals & creatures</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/architecture">Architecture</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/cars-vehicles">Cars & Vehicles</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/characters">Characters</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/cultural-heritage">Cultural Heritage</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/gaming">Gaming</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/places-scenes">Places & Scenes</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/products-technology">Products & Technology</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/science-nature-education">Science, Nature & Education</Link>
                        </li>
                        <li className="item">
                            <Link activeClassName="active" to="/category/weapons">Weapons</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;
