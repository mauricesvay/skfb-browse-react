import React from 'react';
import { Link } from 'react-router';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="sidebar">
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
                        <li className="item"><Link activeClassName="active" to="/category/ed9e048550b2478eb1ab2faaba192832">Animals & creatures</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/f825c721edb541dbbc8cd210123616c7">Architecture</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/22a2f677efad4d7bbca5ad45f9b5868e">Cars & Vehicles</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/2d643ff5ed03405b9c34ecdffff9d8d8">Characters</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/86f23935367b4a1f9647c8a20e03d716">Cultural Heritage</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/3badf36bd9f549bdba295334d75e04d3">Gaming</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/c51b29706d4e4e93a82e5eea7cbe6f91">Places & Scenes</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/d7cebaeca8604ebab1480e413404b679">Products & Technology</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/17d20ca7b35243d4a45171838b50704c">Science, Nature & Education</Link></li>
                        <li className="item"><Link activeClassName="active" to="/category/3f8d0eab859c45ae8ea3af1033d6f3e4">Weapons</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;
