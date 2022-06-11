import { Component } from 'react'
import CartItem from './CartItem'

export default class Cart extends Component{

    render(){
        this.cartElements = []
        Object.keys(this.props.cart).forEach((productId, index)=>{
            if(typeof this.props.cart[productId] === 'number'){
                //this is a single attribute type product eg. apple airtag
                this.cartElements.push(
                    <CartItem changeCart={this.props.changeCart} key={index} productId={productId} amount={this.props.cart[productId]}/>
                )
            }else{
                // this is a varible attribute type product eg. ps-5
                Object.keys(this.props.cart[productId]).forEach((attributeCombinationString, innerIndex)=>{
                    let attributeCombination = JSON.parse(attributeCombinationString)
                    this.cartElements.push(
                        <CartItem changeCart={this.props.changeCart} key={`${index}-${innerIndex}`} productId={productId} amount={this.props.cart[productId][attributeCombinationString]} attributeCombination={attributeCombination}/>
                    )
                })
            }
        })
        // console.log(this.props.cart)
        return(
            <div className="cartContainer">
                <div className="cartName">
                    CART
                </div>
                <div className="cartItems">
                    {this.cartElements}
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