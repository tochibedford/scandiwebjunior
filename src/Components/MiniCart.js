import { Component, createRef } from "react";
import CartItem from "./CartItem";

export default class MiniCart extends Component{
    constructor(props){
        super(props);
        this.handleClickMiniCart = this.handleClickMiniCart.bind(this)
        this.miniCartItemsRef = createRef()
        this.miniCartTotalRef = createRef()
        this.total = 0
    }

    handleClickMiniCart(e){
        e.stopPropagation();
    }

    handleViewBag(){
        window.location.href = '/cart'
    }

    componentDidMount(){
        // this.total = 0
        // Array.from(this.miniCartItemsRef.current.children).forEach(miniCartItem=>{
        //     this.total += parseFloat(miniCartItem.getAttributeNode("price").value) * parseInt(miniCartItem.getAttributeNode("amount").value)
        // })
        // this.miniCartTotalRef.current.innerText = this.props.currentCurrency + `${this.total.toFixed(2)}`
    }

    componentDidUpdate(){
        //calculate total and amount and manually replace it in the DOM
        this.total = 0
        Array.from(this.miniCartItemsRef.current.children).forEach(miniCartItem=>{
            this.total += parseFloat(miniCartItem.getAttributeNode("price").value) * parseInt(miniCartItem.getAttributeNode("amount").value)
        })
        this.miniCartTotalRef.current.innerText = this.props.currentCurrency + `${this.total.toFixed(2)}`
        
    }

    render(){
        this.total = 0
        let miniCartItems = document.querySelectorAll('.cartItem')
        miniCartItems.forEach(miniCartItem=>{
            this.total += parseFloat(miniCartItem.getAttributeNode("price").value) * parseInt(miniCartItem.getAttributeNode("amount").value)
        })
        this.cartElements = []
        Object.keys(this.props.cart).forEach((productId, index)=>{
            if(typeof this.props.cart[productId] === 'number'){
                //this is a single attribute type product eg. apple airtag
                this.cartElements.push(
                    <CartItem currentCurrency={this.props.currentCurrency} miniCart={true} changeCart={this.props.changeCart} key={index} productId={productId} amount={this.props.cart[productId]}/>
                )
            }else{
                // this is a varible attribute type product eg. ps-5
                Object.keys(this.props.cart[productId]).forEach((attributeCombinationString, innerIndex)=>{
                    let attributeCombination = JSON.parse(attributeCombinationString)
                    this.cartElements.push(
                         <CartItem currentCurrency={this.props.currentCurrency} miniCart={true} changeCart={this.props.changeCart} key={`${index}-${innerIndex}`} productId={productId} amount={this.props.cart[productId][attributeCombinationString]} attributeCombination={attributeCombination}/>
                    )
                })
            }
        })
        return(
            <div className="miniCartBackground">
                <div className="miniCart" onClick={this.handleClickMiniCart}>
                    <div className="miniCartName">My Bag, <div className="miniCartNameItems">3 Items</div></div>
                    <div className="miniCartItems" ref={this.miniCartItemsRef}>
                        {this.cartElements}
                    </div>
                    <div className="miniCartOrder">
                        <div className="miniCartTotal">
                            <div className="miniCartLabel">Total:</div>
                           <div className="miniCartTotalValue" ref={this.miniCartTotalRef}> {`${this.props.currentCurrency + this.total.toFixed(2)}`}</div>
                        </div>
                        <div className="miniCartButtons">
                            <div className="miniCartViewButton" onClick={this.handleViewBag}>VIEW BAG</div>
                            <div className="miniCartOrderButton">CHECK OUT</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}