import React, {Component} from 'react';
import "../assets/scss/homepage.scss";
import pizzaBg from "../assets/img/pizza_bg.jpg";
import {FiGrid, FiList} from "react-icons/all";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import productData from "../static-data/product.json";
import {Button, Form, Modal} from "react-bootstrap";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import axios from "axios";
import config from "../config/config";
import Header from "../layouts/Header";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setIsListView: false,
            isListView: false,
            productList: productData,
            totalCartItem: 0,
            totalCartPrice: 0,
            deliveryAddress: null,
            setShowLocationModal: false,
            cartClickStatus: true,
            deliveryCharge: 0,
            cartItems: [],
            setShowCartModal: false,
            handleProceedToCheckoutModal: false,
            customerName: '',
            customerPhone: '',
            customerAddress: '',
            showOrderhistory: false,
            orderHistory: []
        }
    }

    componentDidMount() {

        axios.get(`${config.API_URL}get-pizzas`)
            .then(res => {
                this.setState({productList: res.data.response.pizzas});
            }).catch(e => this.setState({error: true}));
    }

    handleCloseHistoryoutModal = () => {
        this.setState({showOrderhistoryModal: false});
    };
    handleOrderHistory = () => {
        axios.get(`${config.API_URL}get-order-history`)
            .then(res => {
                this.setState({orderHistory: res.data.response.orders});
            }).catch(e => this.setState({error: true}));
        this.setState({showOrderhistoryModal: true});
    };

    handleViewGrid = () => {
        this.setState({setIsListView: false, isListView: false});
    }

    handleViewList = () => {
        this.setState({setIsListView: true, isListView: true});
    }

    handleAddToCart = async (productid, cartdData) => {
        if (this.state.deliveryAddress === null) {
            this.setState({setShowLocationModal: true});
        } else {
            await this.setState({cartItems: [...this.state.cartItems, cartdData[0]]});
            this.setState({
                deliveryCharge: 20,
                totalCartItem: this.state.totalCartItem + 1,
                cartClickStatus: false,
                totalCartPrice: this.state.totalCartPrice + parseInt(cartdData[0].price)
            });
            ToastsStore.success("Item has been added in cart successfully!");
        }
    };

    handleCloseLocationModal = () => {
        this.setState({setShowLocationModal: false});
    };

    handleStartOrder = () => {
        this.setState({setShowLocationModal: false});
    };

    handleChange = (event) => {
        this.setState({deliveryAddress: event.target.value});
    };
    handleNameChange = (e) => {
        this.setState({customerName: e.target.value});
    };

    handlePhoneChange = (e) => {
        this.setState({customerPhone: e.target.value});
    };

    handleAddressChange = (e) => {
        this.setState({customerAddress: e.target.value});
    };

    handleQtyChange = (itemIndex, qty, track) => {
        let newArray = [...this.state.cartItems];
        newArray[itemIndex] = {...newArray[itemIndex], qty: qty};
        this.setState({cartItems: newArray, totalCartItem: track === 'plus' ? this.state.totalCartItem + 1 : this.state.totalCartItem - 1, totalCartPrice: track === 'plus' ? this.state.totalCartPrice + parseInt(newArray[itemIndex].price) : this.state.totalCartPrice - parseInt(newArray[itemIndex].price)});
    };
    removeCartItem = (itemIndex) => {
        this.setState({setShowCartModal: false});
        let newArray = [...this.state.cartItems];
        newArray.splice(itemIndex, 1);
        let length = this.state.cartItems.length - 1;
        this.setState({setShowCartModal: length < 1 ? false : true, cartClickStatus: length < 1 ? true : false, cartItems: newArray, totalCartItem: this.state.totalCartItem - this.state.cartItems[itemIndex].qty, totalCartPrice: this.state.totalCartPrice - parseInt((this.state.cartItems[itemIndex].price * this.state.cartItems[itemIndex].qty))});
    };

    handleShowCartModal = () => {
        this.setState({setShowCartModal: true});
    };

    handleCloseCartModal = () => {
        this.setState({setShowCartModal: false});
    };

    handleProceedToCheckoutModal = () => {
        this.setState({handleProceedToCheckoutModal: true, setShowCartModal: false});
    };

    handleCloseCheckoutModal = () => {
        this.setState({handleProceedToCheckoutModal: false});
    };

    handleBackToCart = () => {
        this.setState({handleProceedToCheckoutModal: false, setShowCartModal: true});
    };

    handlePlaceOrder = () => {
        const data = {
            cartInfo: this.state.cartItems,
            deliveryCharge: this.state.deliveryCharge,
            deliveryAddress: this.state.deliveryAddress,
            totalPrice: this.state.totalCartPrice + this.state.deliveryCharge,
            customerName: this.state.customerName,
            customerPhone: this.state.customerPhone,
            customerAddress: this.state.customerAddress,
        };
        axios.post("https://parallaxlogicit.com/pi/api/store-order", data)
            .then(response => {
                if (response.data.meta.status === 200) {
                    this.setState({
                        cartItems: [],
                        deliveryAddress: null,
                        totalCartPrice: 0,
                        totalCartItem: 0,
                        handleProceedToCheckoutModal: false,
                        cartClickStatus: true,
                    });
                    ToastsStore.success(response.data.response.message);
                }
            }).catch(error => {
            ToastsStore.error("Sorry something went wrong!");
        });
    };

    render() {
        let orderExist = this.state.orderHistory.length < 1 ? <h5 className="text-center">You don't have any order yet. Please make an order.</h5> : "";
        return (
            <div>
                <Header showOrderhistory={this.handleOrderHistory}/>

                <Modal size="lg" show={this.state.showOrderhistoryModal} onHide={this.handleCloseHistoryoutModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center"> Order History </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

                        {orderExist}

                    </Modal.Body>
                </Modal>

                <Modal show={this.state.handleProceedToCheckoutModal} onHide={this.handleCloseCheckoutModal}>
                    <Modal.Header closeButton>
                        <a href="javascript:void(0);" onClick={this.handleBackToCart}>Back to Cart</a>
                    </Modal.Header>
                    <Modal.Body>
                        <Modal.Title className="text-center"> Checkout </Modal.Title>
                        <p className="text-center">Confirm Your Order Details</p>
                        <table responsive className="table table-striped">
                            <tbody>
                            <tr>
                                <td>Service</td>
                                <td className="text-right">Delivery</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td className="text-right">$ {this.state.totalCartPrice + this.state.deliveryCharge}</td>
                            </tr>
                            <tr>
                                <td>Delivery Address</td>
                                <td className="text-right">{this.state.deliveryAddress}</td>
                            </tr>
                            </tbody>
                        </table>
                        <hr/>

                        <h5 className="mb-3">Customer Information</h5>

                        <Form.Group controlId={"Name"}>
                            <Form.Label className="sr-only">Name</Form.Label>
                            <Form.Control placeholder="Name" type="text" onChange={this.handleNameChange}/>
                        </Form.Group>

                        <Form.Group controlId={"phone"}>
                            <Form.Label className="sr-only">Phone</Form.Label>
                            <Form.Control placeholder="Phone" type="text" onChange={this.handlePhoneChange}/>
                        </Form.Group>

                        <Form.Group controlId={"addressLineOne"}>
                            <Form.Label className="sr-only">Address </Form.Label>
                            <Form.Control placeholder="Address Line 1" type="text" onChange={this.handleAddressChange}/>
                        </Form.Group>

                        <Button block={true} variant={"primary"} onClick={this.handlePlaceOrder}>Place Order</Button>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.setShowLocationModal} onHide={this.handleCloseLocationModal}>

                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Delivery Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId={"Name"}>
                            <Form.Label className="sr-only">Please select delivery address</Form.Label>
                            <Form.Control as="textarea" rows="2" placeholder="Please type your delivery address" type="text" value={this.state.value} onChange={this.handleChange}/>
                        </Form.Group>

                        <Button block={true} variant={"primary"} onClick={this.handleStartOrder}>Start Order</Button>
                    </Modal.Body>
                </Modal>

                <div style={{backgroundImage: `url(${pizzaBg})`}} className={"full-page-background"}>
                    <div className="overlay dark" style={{marginTop: 58}}>
                        <div className="home-page-header">
                            <h2 className="main-title">Pizza Order and Delivery System.</h2>
                        </div>

                        <div className="menu-box">
                            <div className="box-header">
                                <h3 className="box-title">Menu</h3>
                                <div className="view-actions">
                                    <span onClick={this.handleViewList} className={this.state.isListView ? 'action active' : 'action'}><FiList/></span>
                                    <span onClick={this.handleViewGrid} className={!this.state.isListView ? 'action active' : 'action'}><FiGrid/></span>
                                </div>
                            </div>

                            <div className="box-body">
                                <ProductList
                                    isListView={this.state.isListView}
                                    data={this.state.productList}
                                    addtocart={this.handleAddToCart}
                                />
                            </div>
                        </div>
                        <Cart
                            handleProceedToCheckoutModal={this.handleProceedToCheckoutModal}
                            handleCloseCartModal={this.handleCloseCartModal}
                            handleShowCartModal={this.handleShowCartModal}
                            setShowCartModal={this.state.setShowCartModal}
                            deliveryCharge={this.state.deliveryCharge}
                            removeCartItem={this.removeCartItem}
                            handleQtyChange={this.handleQtyChange}
                            cartClickStatus={this.state.cartClickStatus}
                            totalItem={this.state.totalCartItem}
                            totalCartPrice={this.state.totalCartPrice}
                            cartItems={this.state.cartItems}
                        />
                    </div>
                </div>
                <ToastsContainer store={ToastsStore}/>
            </div>
        );
    }
}

export default Main;