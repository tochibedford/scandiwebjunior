import { Component } from "react";
import CartItem from "./CartItem";

export default class MiniCart extends Component{
    constructor(props){
        super(props);
        this.handleClickMiniCart = this.handleClickMiniCart.bind(this)
    }

    handleClickMiniCart(e){
        e.stopPropagation();
    }

    handleViewBag(){
        window.location.href = '/cart'
    }

    render(){
        this.cartElements = []
        Object.keys(this.props.cart).forEach((productId, index)=>{
            if(typeof this.props.cart[productId] === 'number'){
                //this is a single attribute type product eg. apple airtag
                this.cartElements.push(
                    <CartItem miniCart={true} changeCart={this.props.changeCart} key={index} productId={productId} amount={this.props.cart[productId]}/>
                )
            }else{
                // this is a varible attribute type product eg. ps-5
                Object.keys(this.props.cart[productId]).forEach((attributeCombinationString, innerIndex)=>{
                    let attributeCombination = JSON.parse(attributeCombinationString)
                    this.cartElements.push(
                        <CartItem miniCart={true} changeCart={this.props.changeCart} key={`${index}-${innerIndex}`} productId={productId} amount={this.props.cart[productId][attributeCombinationString]} attributeCombination={attributeCombination}/>
                    )
                })
            }
        })
        return(
            <div className="miniCartBackground">
                <div className="miniCart" onClick={this.handleClickMiniCart}>
                    <div className="miniCartName">My Bag, <div className="miniCartNameItems">3 Items</div></div>
                    <div className="miniCartItems">
                        {this.cartElements}
                    </div>
                    <div className="miniCartOrder">
                        <div className="miniCartTotal">
                            <div className="miniCartLabel">Total:</div>
                            <div className="miniCartTotalValue">$200.00</div>
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