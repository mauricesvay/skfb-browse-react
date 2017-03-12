import React from 'react';
import { NavLink } from 'react-router-dom';

let Sidebar = ( props ) => (
    <div className="sidebar">
        <div className="navigation-main section animated fadeInLeft">
            <ul className="sidebar-menu">
                <li className="item">
                    <NavLink activeClassName="active" to="/staffpicks">
                        <i className="icon ion-ios-heart"></i>
                        Staffpicks</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/popular">
                        <i className="icon ion-connection-bars"></i>
                        Popular</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/recent">
                        <i className="icon ion-ios-clock"></i>
                        Recent</NavLink>
                </li>
            </ul>
        </div>
        <div className="navigation-categories section animated fadeInLeft">
            <h2 className="sidebar-title">
                Categories
            </h2>
            <ul className="categories sidebar-menu">
                <li className="item">
                    <NavLink activeClassName="active" to="/category/animals-creatures">Animals & creatures</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/architecture">Architecture</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/cars-vehicles">Cars & Vehicles</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/characters">Characters</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/cultural-heritage">Cultural Heritage</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/gaming">Gaming</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/places-scenes">Places & Scenes</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/products-technology">Products & Technology</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/science-nature-education">Science, Nature & Education</NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/weapons">Weapons</NavLink>
                </li>
            </ul>
        </div>
    </div>
);

export default Sidebar;
