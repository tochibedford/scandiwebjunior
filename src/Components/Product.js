import { Component, createRef } from 'react'
import cart from '../images/cart.svg'
import productImage from '../images/Smino.jpg'

export default class Product extends Component{

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
                    <div className="productName">Running Shorts</div>
                    <div className="productPrice">$50.00</div>
                </div>
            </div>
        )
    }
}