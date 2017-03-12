import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import Sidebar from '../components/Sidebar';
import SearchForm from '../components/SearchForm';
import UserInfo from '../components/UserInfoContainer';

import Staffpicks from './Staffpicks';
import Popular from './Popular';
import Recent from './Recent';
import Search from './Search';
import Category from './Category';
import Collection from './Collection';
import ModelDetail from './ModelDetail';

import Modal from '../components/Modal';

class App extends React.Component {

    componentWillUpdate( nextProps ) {
        const { location } = this.props
        if (nextProps.history.action !== 'POP' && ( !location.state || !location.state.modal )) {
            this.previousLocation = this.props.location
        }
    }

    render( ) {

        const { location } = this.props;
        const isModal = !!( location.state && location.state.modal && this.previousLocation !== location );

        return <div className="app">
            <header className="header">
                <div className="logo">
                    <NavLink to="/"><img src="assets/img/logo-sketchfab-white.png" width="140"/></NavLink>
                </div>
                <div className="toolbar">
                    <SearchForm></SearchForm>
                    <div className="userInfo">
                        <UserInfo></UserInfo>
                    </div>
                </div>
            </header>
            <div className="main">
                <Sidebar/>
                <div className="content">
                    <Switch location={isModal
                        ? this.previousLocation
                        : location}>
                        <Route path="/staffpicks" component={Staffpicks}/>
                        <Route path="/popular" component={Popular}/>
                        <Route path="/recent" component={Recent}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/category/:category" component={Category}/>
                        <Route path="/collection/:id" component={Collection}/>
                        <Route path='/model/:id' component={ModelDetail}/>
                    </Switch>
                </div>
            </div>
            {isModal
                ? <Route path='/model/:id' component={Modal}/>
                : null}
        </div>;
    }
}

export default App;
