import { Component, createRef } from "react";
import CartItem from "./CartItem";

export default class MiniCart extends Component{
    constructor(props){
        super(props);
        
        this.handleClickMiniCart = this.handleClickMiniCart.bind(this)
        this.miniCartBackgroundRef = createRef()
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

    componentDidUpdate(){
        const {currentCurrency, showMiniCart} = this.props
        //calculate total and amount and manually replace it in the DOM
        this.total = 0
        Array.from(this.miniCartItemsRef.current.children).forEach(miniCartItem=>{
            this.total += parseFloat(miniCartItem.getAttributeNode("price").value) * parseInt(miniCartItem.getAttributeNode("amount").value)
        })
        this.miniCartTotalRef.current.innerText = currentCurrency + `${this.total.toFixed(2)}`
        if(showMiniCart===false){
            setTimeout(()=>{
                this.miniCartBackgroundRef.current.classList.add("hideVisibility")
            },200)
        }else{
            this.miniCartBackgroundRef.current.classList.remove("hideVisibility")
        }
    }

    render(){
        const {amount, cart, changeCart, currentCurrency, showMiniCart} = this.props;
    
        this.total = 0
        const miniCartItems = document.querySelectorAll('.miniCartItem')
        miniCartItems.forEach(miniCartItem=>{
            this.total += parseFloat(miniCartItem.getAttributeNode("price").value) * parseInt(miniCartItem.getAttributeNode("amount").value)
        })
        this.cartElements = []
        Object.keys(cart).forEach((productId, index)=>{
            if(typeof cart[productId] === 'number'){
                //this is a single attribute type product eg. apple airtag
                this.cartElements.push(
                    <CartItem currentCurrency={currentCurrency} miniCart={true} changeCart={changeCart} key={index} productId={productId} amount={cart[productId]}/>
                )
            }else{
                // this is a varible attribute type product eg. ps-5
                Object.keys(cart[productId]).forEach((attributeCombinationString, innerIndex)=>{
                    const attributeCombination = JSON.parse(attributeCombinationString)
                    this.cartElements.push(
                         <CartItem currentCurrency={currentCurrency} miniCart={true} changeCart={changeCart} key={`${index}-${innerIndex}`} productId={productId} amount={cart[productId][attributeCombinationString]} attributeCombination={attributeCombination}/>
                    )
                })
            }
        })
        return(
            <div className={`miniCartBackground ${!showMiniCart? "hideMiniCart":""}`} ref={this.miniCartBackgroundRef}>
                <div className="miniCart" onClick={this.handleClickMiniCart}>
                    <div className="miniCartName">My Bag, <div className="miniCartNameItems">{amount} Items</div></div>
                    <div className="miniCartItems" ref={this.miniCartItemsRef}>
                        {this.cartElements}
                    </div>
                    <div className="miniCartOrder">
                        <div className="miniCartTotal">
                            <div className="miniCartLabel">Total:</div>
                           <div className="miniCartTotalValue" ref={this.miniCartTotalRef}> {currentCurrency + this.total.toFixed(2)}</div>
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