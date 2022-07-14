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
        const result = nextProps.prices.filter(price=>{
            return price.currency.symbol === nextProps.currentCurrency;
        })
        return {
            price: result[0].amount
        }
    }

    handleOpenPDP(e){
        const {id} = this.props;
        e.preventDefault();
        window.location.href = `/product/${id}`
    }

    handleAddToCart(e){
        // check if the product has multiple attributes
        // if it does redirect to product description page
        // if it doesn't add the product directly to cart\
        const {id, attributes, cart, changeCart} = this.props;
        e.preventDefault()
        if(attributes.length>0){
            window.location.href = `/product/${id}`
        }else{
            cart[`${id}`]? cart[`${id}`]+= 1:cart[`${id}`]=1
            changeCart(
                cart
            )
            localStorage.setItem('cart',JSON.stringify(cart))
            e.stopPropagation();
        }
    }

    render(){
        const {id, gallery, inStock, brand, name, currentCurrency} = this.props;
        return(
            <Link to={`/product/${id}`} onClick={this.handleOpenPDP} className="productLink">
                <div id={id} className="product">
                    <div className="productImageContainer">
                        <div className="productImageContainerInner">
                            <img className="productImage" src={gallery[0]} alt="product" />
                            {!inStock && <div className="outOfStock">OUT OF STOCK</div>}
                        </div>
                        {inStock && <div className="addToCartImageContainer" onClick={this.handleAddToCart}>
                            <img className="addToCartImage" src={cart} alt="add to cart" />
                        </div>}
                    </div>
                    <div className="productInfo">
                        <div className="productName">{brand} {name}</div>
                        <div className="productPrice">{currentCurrency} {this.state.price.toFixed(2)}</div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default withRouter(Product);