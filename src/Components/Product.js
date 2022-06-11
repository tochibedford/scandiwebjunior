import { Component } from 'react'
import cart from '../images/cart.svg'
import { Link, withRouter} from 'react-router-dom';

class Product extends Component{
    constructor(props){
        super(props);
        this.handleOpenPDP = this.handleOpenPDP.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
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

    handleOpenPDP(e){
        e.preventDefault();
        window.location.href = `/product/${this.props.id}`
    }

    handleAddToCart(e){
        // check if the product has multiple attributes
        // if it does redirect to product description page
        // if it doesn't add the product directly to cart\
        e.preventDefault()
        if(this.props.attributes.length>0){
            window.location.href = `/product/${this.props.id}`
        }else{
            let cart = this.props.cart
            let id = this.props.id
            this.props.cart[`${this.props.id}`]? this.props.cart[`${this.props.id}`]+= 1:this.props.cart[`${this.props.id}`]=1
            localStorage.setItem('cart',JSON.stringify(this.props.cart))
            e.stopPropagation();
        }
        // console.log(this.props.cart)
    }

    render(){
        return(
            <Link to={`/product/${this.props.id}`} onClick={this.handleOpenPDP} className="productLink">
                <div id={this.props.id} className="product">
                    <div className="productImageContainer">
                        <div className="productImageContainerInner">
                            <img className="productImage" src={this.props.gallery[0]} alt="product" />
                        </div>
                        <div className="addToCartImageContainer" onClick={this.handleAddToCart}>
                            <img className="addToCartImage" src={cart} alt="add to cart" />
                        </div>
                    </div>
                    <div className="productInfo">
                        <div className="productName">{this.props.brand} {this.props.name}</div>
                        <div className="productPrice">{this.props.currentCurrency} {this.state.price}</div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default withRouter(Product);