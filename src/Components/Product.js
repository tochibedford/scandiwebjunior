import { Component, createRef } from 'react'
import cart from '../images/cart.svg'
import productImage from '../images/Smino.jpg'

export default class Product extends Component{
    constructor(props){
        super(props);
        
        this.addToCartRef = createRef()
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.state = {
            showAddToCart: false 
        }
    }

    handleMouseOver(){
        this.addToCartRef.current.style.opacity = 1;
        this.setState(prevState=>{
            return(
                {
                    showAddToCart: true
                }
            )
        })
    }

    handleMouseLeave(){
        this.addToCartRef.current.style.opacity = 0;
        this.setState(prevState=>{
            return(
                {
                    showAddToCart: true
                }
            )
        })
    }


    render(){
        return(
            <div className="product" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <div className="productImageContainer">
                    <img className="productImage" src={productImage} alt="product" />
                    <div className="addToCartImageContainer" ref={this.addToCartRef}>
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