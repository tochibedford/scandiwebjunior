import { Component } from 'react';
import Attribute from './Attribute';
import CartItemGallery from './CartItemGallery';
import { graphFetch, productQuery } from './helpers';

export default class CartItem extends Component{
    constructor(props){
        super(props);

        this.handleCartQuantityChange = this.handleCartQuantityChange.bind(this)
        this.state = {
            id: null,
            gallery: null,
            brandName: null,
            productName: null,
            attributes: null,
            prices: null,
        }
    }

    componentDidMount(){
        const {productId, currentCurrency} = this.props;
        
        graphFetch(productQuery(productId)).then(data=>{
            data = data.data.product
            this.priceResult = data.prices.filter(price=>{
                return price.currency.symbol === currentCurrency;
            })
            
            this.setState(()=>{
                return{
                    id: data.id,
                    gallery: data.gallery,
                    brandName: data.brand,
                    productName: data.name,
                    attributes: data.attributes,
                    prices: data.prices,
                    // put other data here
                }
            })
        })
    }

    handleCartQuantityChange(event){
        const {productId, changeCart, attributeCombination} = this.props;
        const cart = JSON.parse(localStorage.getItem('cart'))
        if( typeof cart[productId] === 'number'){
            this.productAttributeCombinationAmount = cart[productId]
            if(event.currentTarget.innerText === '+'){
                cart[productId] = this.productAttributeCombinationAmount + 1
                localStorage.setItem('cart', JSON.stringify(cart))
                changeCart(
                        cart
                )
            }else{
                if(this.productAttributeCombinationAmount === 1){
                    delete cart[productId] //cart operation
                    localStorage.setItem('cart', JSON.stringify(cart))
                    changeCart(
                            cart
                    )

                }else{
                    cart[productId] = this.productAttributeCombinationAmount - 1 //cart operation
                    localStorage.setItem('cart', JSON.stringify(cart))
                    changeCart(
                            cart
                    )
                }
            }
            
        }else{
            this.productAttributeCombinationAmount = cart[productId][JSON.stringify(attributeCombination)]
            if(event.currentTarget.innerText === '+'){
                cart[productId][JSON.stringify(attributeCombination)] = this.productAttributeCombinationAmount + 1
                localStorage.setItem('cart', JSON.stringify(cart))
                changeCart(
                        cart
                )
            }else{
                if(this.productAttributeCombinationAmount === 1){
                    delete cart[productId][JSON.stringify(attributeCombination)]
                    if(Object.keys(cart[productId]).length === 0){
                        delete cart[productId]
                    }
                    localStorage.setItem('cart', JSON.stringify(cart))
                    changeCart(
                            cart
                    )
                }else{
                    cart[productId][JSON.stringify(attributeCombination)] = this.productAttributeCombinationAmount - 1
                    localStorage.setItem('cart', JSON.stringify(cart))
                    changeCart(
                            cart
                    )
                }
            }
        }

    }

    render(){
        const {currentCurrency, attributeCombination, miniCart, amount} = this.props;
        this.attributeElements = []
        if(this.state.prices){
            this.priceResult = this.state.prices.filter(price=>{
                return price.currency.symbol === currentCurrency;
            })
        }
        if(this.state.id){
            if(attributeCombination){
                Object.keys(attributeCombination).forEach((attributeId, index)=>{

                    this.attributeElements.push(
                        <Attribute key={index} changeable={false} selectedAttribute={attributeCombination[attributeId]} productId={this.state.id} attribute={this.state.attributes[index]} index={index}/>
                    )
                })
                if(!miniCart){
                    return(
                        <div className='cartItem' price={this.priceResult[0].amount} amount={amount}>
                            <div className='cartItemInfo'>
                                {this.state.brandName && <div className="cartItemBrandName">{this.state.brandName}</div>}  
                                {this.state.productName && <div className="cartItemProductName">{this.state.productName}</div>}  
                                {this.state.prices && <div className="cartItemPrice">{currentCurrency}{this.priceResult[0].amount.toFixed(2)}</div>}  
                                {this.state.attributes && <div className="cartItemAttributes">{this.attributeElements}</div>}  
                            </div>
                            <div className="cartItemQuantity">
                                <div className="cartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                                <div className="cartItemQuantityValue" >{amount}</div>
                                <div className="cartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                            </div>
                            <div className="cartItemGalleryContainer">
                                {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className='miniCartItem' price={this.priceResult[0].amount} amount={amount}>
                            <div className='miniCartItemInfo'>
                                {this.state.brandName && <div className="miniCartItemBrandName">{this.state.brandName}</div>}  
                                {this.state.productName && <div className="miniCartItemProductName">{this.state.productName}</div>}  
                                {this.state.prices && <div className="miniCartItemPrice">{currentCurrency}{this.priceResult[0].amount.toFixed(2)}</div>}  
                                {this.state.attributes && <div className="miniCartItemAttributes">{this.attributeElements}</div>}  
                            </div>
                            <div className="miniCartItemQuantity">
                                <div className="miniCartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                                <div className="miniCartItemQuantityValue" >{amount}</div>
                                <div className="miniCartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                            </div>
                            <div className="miniCartItemGalleryContainer">
                                {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                            </div>
                        </div>
                    )

                }
            }
            if(!miniCart){
                return(
                    <div className='cartItem' id={attributeCombination} price={this.priceResult[0].amount} amount={amount}>
                        <div className="cartItemInfo">
                            {this.state.brandName && <div className="cartItemBrandName">{this.state.brandName}</div>}  
                            {this.state.productName && <div className="cartItemProductName">{this.state.productName}</div>}  
                            {this.state.prices && <div className="cartItemPrice">{currentCurrency}{this.priceResult[0].amount.toFixed(2)}</div>}
                        </div>
                        <div className="cartItemQuantity">
                            <div className="cartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                            <div className="cartItemQuantityValue" >{amount}</div>
                            <div className="cartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                        </div>
                        <div className="cartItemGalleryContainer">
                            {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className='miniCartItem' id={attributeCombination} price={this.priceResult[0].amount} amount={amount}>
                        <div className="miniCartItemInfo">
                            {this.state.brandName && <div className="miniCartItemBrandName">{this.state.brandName}</div>}  
                            {this.state.productName && <div className="miniCartItemProductName">{this.state.productName}</div>}  
                            {this.state.prices && <div className="miniCartItemPrice">{currentCurrency}{this.priceResult[0].amount.toFixed(2)}</div>}
                        </div>
                        <div className="miniCartItemQuantity">
                            <div className="miniCartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                            <div className="miniCartItemQuantityValue" >{amount}</div>
                            <div className="miniCartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                        </div>
                        <div className="miniCartItemGalleryContainer">
                            {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                        </div>
                    </div>
                )
            }
        }
    }
}