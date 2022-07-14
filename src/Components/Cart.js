import { Component } from 'react'
import CartItem from './CartItem'

export default class Cart extends Component{
    constructor(props){
        super(props);
        this.priceResults = []
        this.state = {
            total: 0,
            tax: 21
        }
        this.total = 0
        this.amount = 0
        
    }

    componentDidUpdate(){
        const {currentCurrency} = this.props;
        //calculate total and amount and manually replace it in the DOM
        this.total = 0
        this.amount = 0
        const cartItems = document.querySelectorAll('.cartItem')
        cartItems.forEach(cartItem=>{
            this.total += parseFloat(cartItem.getAttributeNode("price").value) * parseInt(cartItem.getAttributeNode("amount").value)
            this.amount += parseInt(cartItem.getAttributeNode("amount").value)
        })
        const cartTotalElement = document.querySelector(".cartTotalValue")
        cartTotalElement.innerText = currentCurrency + `${this.total.toFixed(2)}`
        const cartQuantityElement = document.querySelector(".cartQuantityValue")
        cartQuantityElement.innerText = this.amount
        const cartTaxElement = document.querySelector(".cartTaxValue")
        cartTaxElement.innerText = currentCurrency + `${(this.total * 0.21).toFixed(2)}`
    }

    render(){
        const {cart, currentCurrency, changeCart} = this.props;
        this.total = 0;
        this.amount = 0;
        const cartItems = document.querySelectorAll('.cartItem');
        cartItems.forEach(cartItem=>{
            this.total += parseFloat(cartItem.getAttributeNode("price").value) * parseInt(cartItem.getAttributeNode("amount").value)
            this.amount += parseInt(cartItem.getAttributeNode("amount").value)
        })
        this.cartElements = []
        Object.keys(cart).forEach((productId, index)=>{
            if(typeof cart[productId] === 'number'){
                //this is a single attribute type product eg. apple airtag
                this.cartElements.push(
                    <CartItem currentCurrency={currentCurrency} changeCart={changeCart} key={index} productId={productId} amount={cart[productId]}/>
                )
            }else{
                // this is a varible attribute type product eg. ps-5
                Object.keys(cart[productId]).forEach((attributeCombinationString, innerIndex)=>{
                    const attributeCombination = JSON.parse(attributeCombinationString)
                    this.cartElements.push(
                        <CartItem currentCurrency={currentCurrency} changeCart={changeCart} key={`${index}-${innerIndex}`} productId={productId} amount={cart[productId][attributeCombinationString]} attributeCombination={attributeCombination}/>
                    )
                })
            }
        })
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
                        <div className="cartLabel">Tax {this.state.tax}%:</div> 
                        <div className="cartTaxValue">{currentCurrency}{(this.total*this.state.tax/100).toFixed(2)}</div>
                    </div>
                    <div className="cartQuantity">
                        <div className="cartLabel">Quantity:</div>
                        <div className="cartQuantityValue">{this.amount}</div>
                    </div>
                    <div className="cartTotal">
                        <div className="cartLabel">Total:</div>
                        <div className="cartTotalValue">{currentCurrency}{this.total.toFixed(2)}</div>
                    </div>
                    <div className="cartOrderButton">ORDER</div>
                </div>
            </div>
        )
    }
}