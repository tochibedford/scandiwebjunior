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
            let miniCartShow = !prevState.miniCartShow
            let body = document.querySelector('body');
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
        this.count = 0
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
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
                {/* counter only shows count less than 10, anything above becomes 9+ */}
                {this.state.cart && this.count<10 ? <div className="cartCounter">{this.count}</div>:<div className="cartCounter">9+</div>}
                <img className="cart" src={cartIcon} alt="shopping cart icon"/>
                <MiniCart showMiniCart={this.state.miniCartShow} amount={this.count} currentCurrency={this.props.currentCurrency} cart={this.props.cart} changeCart={this.props.changeCart}/>
            </div>
        )
    }
}