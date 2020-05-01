import React, {Component} from 'react';
import '../assets/scss/header.scss';
import {Link, withRouter} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='header collapsed-sidebar'>
                <div className="header-brand">
                    <Link to="/" className="brand-logo"><img src="" alt=""/></Link>
                </div>

                <div className="header-content">
                    <div className="layout-actions">
                        <Link to="/" >Home</Link> &nbsp; &nbsp; &nbsp;
                        <Link to="/order-history">Order History</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
