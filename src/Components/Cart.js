import { Component } from 'react'
import CartItem from './CartItem'

export default class Cart extends Component{

    render(){
        console.log(this.props.cart)
        return(
            <div className="cartContainer">
                <div className="cartName">
                    CART
                </div>
                <div className="cartItems">
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </div>
                <div className="cartOrder">
                    <div className="cartTax">
                        <div className="cartLabel">Tax 21%:</div> 
                        <div className="cartTaxValue">$42.00</div>
                    </div>
                    <div className="cartQuantity">
                        <div className="cartLabel">Quantity:</div>
                        <div className="cartQuantityValue">3</div>
                    </div>
                    <div className="cartTotal">
                        <div className="cartLabel">Total:</div>
                        <div className="cartTotalValue">$200.00</div>
                    </div>
                    <div className="cartOrderButton">ORDER</div>
                </div>
            </div>
        )
    }
}