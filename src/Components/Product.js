import { Component, createRef } from 'react'
import cart from '../images/cart.svg'
import productImage from '../images/Smino.jpg'

export default class Product extends Component{

    render(){
        return(
            <div className="product" >
                <div className="productImageContainer">
                    <img className="productImage" src={productImage} alt="product" />
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