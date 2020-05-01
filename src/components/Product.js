import React, {Component} from 'react';
import "../assets/scss/product.scss";
import {Button} from "react-bootstrap";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartModal: false,
            setShowCartModal: false,
            setSelectedAttr: 0,
            cartData: [],
        }
    }

    handleChangeAttr = async (value, id, name, size, price) => {
        let newData = {id: id, name: name, size: size, price: price, qty: 1};
        let index = this.state.cartData.findIndex(item => item.id === id)
        this.state.cartData.splice(index, 1, newData);
        this.setState({setSelectedAttr: value});
    }

    render() {
        return (
            <div>
                <div className={this.props.isListView ? 'product list' : 'product'}>
                    <div className="product-thumb">
                        <div className="ratio ratio-4-3 bg-cover" style={{backgroundImage: `url(${this.props.data.image})`}}/>
                    </div>

                    <div className="product-desc">
                        <div className="info-header">
                            <h4 className="name">{this.props.data.name}</h4>
                            <p className="desc">{this.props.data.desc}</p>
                            {this.props.data.attributes &&
                            <ul className="attr-list">
                                {this.props.data.attributes.map((attr, index) => {
                                    return (
                                        <li key={index}>
                                            <label htmlFor={`attr-${this.props.data.id}-${index}`}>
                                                <input onChange={() => this.handleChangeAttr(index, this.props.data.id, this.props.data.name, attr.label, attr.current_price)}
                                                       value={attr.id} name={`attr-${this.props.data.id}`}
                                                       type="radio" id={`attr-${this.props.data.id}-${index}`}
                                                       checked={index === this.state.setSelectedAttr}
                                                />
                                                <span className="text">
                                                        <span>$ {attr.current_price}</span>
                                                        <small>{attr.label}</small>
                                                </span>
                                            </label>
                                        </li>
                                    )
                                })}
                            </ul>
                            }
                        </div>

                        <div className="product-actions">
                            <Button size={this.props.isListView ? 'sm' : 'md'} block={true} variant={"primary"} onClick={() => this.props.addtocart(this.props.data.id, this.state.cartData && this.state.cartData.length > 0 ? this.state.cartData : [{id: this.props.data.id, name: this.props.data.name, size: this.props.data.attributes[0].label, price: this.props.data.attributes[0].current_price, qty: 1}])}>Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;