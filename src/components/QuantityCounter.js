import React, {useState} from "react";
import {FiPlus, FiMinus} from "react-icons/all";
import "../assets/scss/quantity-counter.scss";

const QuantityCounter = (props) => {
    let [initialValue, setInitialValue] = useState(props.value ? props.value : 1);
    const handleQntChanger = value => {
        let qnt = initialValue;
        if (value < 0) {
            qnt = initialValue === 0 ? (initialValue = 0) : initialValue + value;
        } else {
            qnt = initialValue + value;
        }
        if (!qnt < 1) {
            setInitialValue((initialValue = qnt));
            props.handleQtyChange(props.cartItemId, qnt, value < 0 ? 'minus' : 'plus');
        }
    };


    return (
        <div className={props.size === 'sm' ? 'quantity-counter quantity-counter-sm' : 'quantity-counter'}>
            <button onClick={() => handleQntChanger(-1)} type="button">
                <FiMinus/>
            </button>
            <input
                className="quantity"
                onChange={e => {
                    console.log(e.target.value);
                }}
                value={initialValue}
            />
            <button onClick={() => handleQntChanger(1)} type="button">
                <FiPlus/>
            </button>
        </div>
    );
};

export default QuantityCounter;
