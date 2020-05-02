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
            <>
                <div className='header collapsed-sidebar'>
                    <div className="header-brand">
                        <Link to="/" className="brand-logo"><img src="" alt=""/></Link>
                    </div>
                    <div className="header-content">
                        <div className="layout-actions">
                            <Link to="/">Home</Link> &nbsp; &nbsp; &nbsp;
                            <a href="javascript:void(0);" onClick={this.props.showOrderhistory}>Order History</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Header;
