import { Component } from 'react'
import cart from '../images/cart.svg'
import ProductDescription from './ProductDescription';

export default class Product extends Component{
    constructor(props){
        super(props);

        this.handleOpenPDP = this.handleOpenPDP.bind(this);
        this.state = {
            price: 0,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let result = nextProps.prices.filter(price=>{
            return price.currency.symbol === nextProps.currentCurrency;
        })
        return {
            price: result[0].amount
        }
    }

    handleOpenPDP(event){
        this.props.toggleProductDescription(event.currentTarget)
    }

    render(){
        return(
            <div id={this.props.id} className="product" onClick={this.handleOpenPDP}>
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