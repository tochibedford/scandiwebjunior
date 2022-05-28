import { Component, createRef } from 'react'
import cart from '../images/cart.svg'

export default class Product extends Component{
    constructor(props){
        super(props);
        
        this.result = this.props.prices.filter(price=>{
            return price.currency.symbol === this.props.currentCurrency;
        })
        this.state = {
            price: this.result[0].amount,
        }
    }

    render(){
        
        return(
            <div id={this.props.id} className="product" >
                <div className="productImageContainer">
                    <div className="productImageContainerInner">
                        <img className="productImage" src={this.props.gallery[0]} alt="product" />
                    </div>
                    <div className="addToCartImageContainer">
                        <img className="addToCartImage" src={cart} alt="add to cart" />
                    </div>
                </div>
                <div className="productInfo">
                    <div className="productName">{this.props.name}</div>
                    <div className="productPrice">{this.props.currentCurrency} {this.state.price}</div>
                </div>
            </div>
        )
    }
}