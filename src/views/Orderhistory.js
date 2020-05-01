import React, {Component} from 'react';
import "../assets/scss/homepage.scss";
import pizzaBg from "../assets/img/pizza_bg.jpg";
import Cart from "../components/Cart";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import axios from "axios";
import {Link} from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCartItem: 0,
            totalCartPrice: 0,
            setShowLocationModal: false,
            cartClickStatus: true,
            orderHistory: []
        }
    }

    componentDidMount() {
        axios.get("https://parallaxlogicit.com/pi/api/get-order-history")
            .then(res => {
                this.setState({orderHistory: res.data.response.orders});
            }).catch(e => this.setState({error: true}));
    }

    render() {
        let orderExist = this.state.orderHistory.length < 1 ? <h5 className="text-center">You don't have any order yet. Please make an order.</h5> : "";
        return (
            <div>
                <div style={{backgroundImage: `url(${pizzaBg})`}} className={"full-page-background"}>
                    <div className="overlay dark" style={{marginTop: 58}}>
                        <div className="home-page-header">
                            <h2 className="main-title">Pizza Order and Delivery System.</h2>
                        </div>

                        <div className="menu-box">
                            <div className="box-header">
                                <h3 className="box-title">Order History</h3>
                                <div className="view-actions">
                                    <Link className="nav-link" to="/"><span>Create New Order</span></Link>
                                </div>
                            </div>

                            <div className="box-body">
                                {orderExist}
                                {this.state.orderHistory.length > 0 &&
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Delivery Address</th>
                                        <th>Customer Information</th>
                                        <th>Order Details</th>
                                        <th className="text-right">Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.orderHistory.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>
                                                <td width="250">{item.delivery_address}</td>
                                                <td width="250">
                                                    Name: {item.customer_name}<br/>
                                                    Phone: {item.customer_phone}<br/>
                                                    Address: {item.customer_address}
                                                </td>
                                                <td>
                                                    {item.order_details.map((item, index) => {
                                                        return (
                                                            <div>
                                                                Item Name: {item.name}
                                                                Qty : {item.qty}
                                                                Attribute : {item.attribute}
                                                                Unit Price : {item.unit_price}
                                                                Total Price: {item.total_price}
                                                                <hr/>
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                                <td className="text-right">$ {item.total_price}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                }
                            </div>
                        </div>
                        <Cart
                            cartClickStatus={this.state.cartClickStatus}
                            totalItem={this.state.totalCartItem}
                            totalCartPrice={this.state.totalCartPrice}
                        />
                    </div>
                </div>
                <ToastsContainer store={ToastsStore}/>
            </div>
        );
    }
}

export default Main;