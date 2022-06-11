import { Component } from 'react';
import cartIcon from '../images/cart.svg'

export default class CartIcon extends Component{
    constructor(props){
        super(props);
        this.state = {
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
        }
    }
    

    render(){
        this.count = 0
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
        // this.count = 0
        Object.keys(cart).forEach(productId=>{
            if(typeof cart[productId] === 'number'){
                this.count += cart[productId]
            }else{
                this.count += Object.values(cart[productId]).reduce((lastSum, currentValue)=>{
                    return lastSum + currentValue
                })
            }
        })
        
        return(
            <div className="cartIconContainer">
                {/* counter only shows count less than 10, anything above becomes 9+ */}
                {this.state.cart && this.count<10 ? <div className="cartCounter">{this.count}</div>:<div className="cartCounter">9+</div>}
                <img className="cart" src={cartIcon} alt="shopping cart icon"/>
            </div>
        )
    }
}