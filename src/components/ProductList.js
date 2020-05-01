import React from "react";
import "../assets/scss/product-list.scss";
import Product from "./Product";

const ProductList = (props) => {
    return (
        <div className={props.isListView ? 'product-list list-view' : 'product-list'}>
            {props.data.map(product => {
                return (
                    <div key={product.id} className="product-item">
                        <Product isListView={props.isListView} data={product} addtocart={props.addtocart} myFunction={props.myFunction}/>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList;
