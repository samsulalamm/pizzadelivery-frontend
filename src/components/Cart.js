import React, {Component} from 'react';
import {FiShoppingCart} from "react-icons/all";
import {Button, Form, Modal} from "react-bootstrap";
import QuantityCounter from "../components/QuantityCounter";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartModal: false,
            setShowCartModal: this.props.setShowCartModal,
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.setShowCartModal} onHide={this.props.handleCloseCartModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Action</th>
                                <th>Item</th>
                                <th>Qnt.</th>
                                <th>Unit price</th>
                                <th>Total Price</th>
                            </tr>
                            </thead>

                            {this.props.cartItems &&
                            <tbody>
                            {this.props.cartItems.map((item, index) => {
                                let TotalPrice = item.qty * item.price;
                                return (
                                    <tr key={index}>
                                        <td><a href="javascript:void(0);" onClick={() => this.props.removeCartItem(index)}>Remove</a></td>
                                        <td>{item.name} - {item.size}</td>
                                        <td>
                                            <QuantityCounter cartItemId={index} handleQtyChange={this.props.handleQtyChange} size={"sm"} value={item.qty}/>
                                        </td>
                                        <td>$ {item.price}</td>
                                        <td className="text-right">$ {TotalPrice}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                            }
                            <tr>
                                <td colSpan="4" className="text-right"><strong>Delivery Charge</strong></td>
                                <td className="text-right"><strong>$ {this.props.deliveryCharge}</strong></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right"><strong>Total Price</strong></td>
                                <td className="text-right"><strong>$ {this.props.totalCartPrice + parseInt(this.props.deliveryCharge)}</strong></td>
                            </tr>
                        </table>
                        <Button block={true} variant={"primary"} onClick={this.props.handleProceedToCheckoutModal}>Proceed to Checkout</Button>
                    </Modal.Body>
                </Modal>

                <button disabled={this.props.cartClickStatus} onClick={this.props.handleShowCartModal} className="btn-cart">
                        <span className="upper-part">
                            <span className="icon"><FiShoppingCart/></span>
                            <span className="item-qnt">{this.props.totalItem} Items</span>
                        </span>
                    <span className="item-price">$ {this.props.totalCartPrice}</span>
                </button>
            </div>
        );
    }
}

export default Cart;