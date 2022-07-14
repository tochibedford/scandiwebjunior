import { Component } from 'react';
import cartIcon from '../images/cart.svg'
import MiniCart from './MiniCart';

export default class CartIcon extends Component{
    constructor(props){
        super(props);
        this.handleCartIconClick = this.handleCartIconClick.bind(this)
        this.state = {
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
            miniCartShow: false
        }
    }
    
    handleCartIconClick(){
        this.setState(prevState=>{
            const miniCartShow = !prevState.miniCartShow
            const body = document.querySelector('body');
            if(miniCartShow){
                body.style.overflow='hidden'
            }else{
                body.style.overflow='auto'
            }
            return{
                ...prevState,
                miniCartShow: miniCartShow
            }
        })
    }

    render(){
        const {currentCurrency, cart: cartProp, changeCart} = this.props;
        this.count = 0
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
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
            <div className="cartIconContainer" onClick={this.handleCartIconClick}>
                {this.state.cart && <div className="cartCounter">{this.count}</div>}
                <img className="cart" src={cartIcon} alt="shopping cart icon"/>
                <MiniCart showMiniCart={this.state.miniCartShow} amount={this.count} currentCurrency={currentCurrency} cart={cartProp} changeCart={changeCart}/>
            </div>
        )
    }
}