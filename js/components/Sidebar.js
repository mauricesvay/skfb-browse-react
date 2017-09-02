import React from "react";
import { NavLink } from "react-router-dom";

let Sidebar = props => (
    <div className="sidebar">
        <div className="navigation-main section animated fadeInLeft">
            <ul className="sidebar-menu">
                <li className="item">
                    <NavLink activeClassName="active" to="/staffpicks">
                        <svg
                            className="icon"
                            version="1.1"
                            x="0px"
                            y="0px"
                            width="14px"
                            height="19px"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path d="M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4
                        		L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z" />
                            </g>
                        </svg>
                        Staffpicks
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/popular">
                        <svg
                            className="icon"
                            version="1.1"
                            x="0px"
                            y="0px"
                            width="14px"
                            height="19px"
                            viewBox="0 0 512 512"
                        >
                            <polygon points="320,128 381.8,189.8 288.3,288 181.3,181.3 32,384 181.3,256 288.3,368 419.2,227.2 480,288 480,128 " />
                        </svg>
                        Popular
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/recent">
                        <svg
                            className="icon"
                            version="1.1"
                            x="0px"
                            y="0px"
                            width="14px"
                            height="19px"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M273,273H160v-17h96V128h17
                        		V273z" />
                            </g>
                        </svg>
                        Recent
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className="navigation-categories section animated fadeInLeft">
            <h2 className="sidebar-title">Categories</h2>
            <ul className="categories sidebar-menu">
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/animals-pets"
                    >
                        Animals &amp; Pets
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/architecture"
                    >
                        Architecture
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/art-abstract"
                    >
                        Art &amp; Abstract
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/cars-vehicles"
                    >
                        Cars & Vehicles
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/characters-creatures"
                    >
                        Characters &amp; Creatures
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/cultural-heritage-history"
                    >
                        Cultural Heritage &amp; History
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/electronics-gadgets"
                    >
                        Electronics &amp; Gadgets
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/fashion-style"
                    >
                        Fashion &amp; Style
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/food-drink">
                        Food &amp; Drink
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/furniture-home"
                    >
                        Furniture &amp; Home
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/gaming">
                        Gaming
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/music">
                        Music
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/nature-plants"
                    >
                        Nature &amp; Plants
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/news-politics"
                    >
                        News &amp; Politics
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink activeClassName="active" to="/category/people">
                        People
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/places-travel"
                    >
                        Places &amp; Travel
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/science-technology"
                    >
                        Science &amp; Technology
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        activeClassName="active"
                        to="/category/sports-fitness"
                    >
                        Sports &amp; Fitness
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
);

export default Sidebar;
