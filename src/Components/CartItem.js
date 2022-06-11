import { Component } from 'react';
import Attribute from './Attribute';
import CartItemGallery from './CartItemGallery';
import { graphFetch } from './helpers';

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
        let productId = this.props.productId
        let query = `
            query{
                product(id:"${productId}"){
                    id
                    name
                    inStock
                    gallery
                    category
                    prices{
                        currency{
                            label
                            symbol
                        }
                        amount
                    }
                    brand
                    attributes{
                        id
                        name
                        type
                        items{
                            id
                            value
                            displayValue
                        }
                    }
                    
                }
            }
        `
        graphFetch(query).then(data=>{
            data = data.product
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
        let cart = JSON.parse(localStorage.getItem('cart'))
        if( typeof cart[this.props.productId] === 'number'){
            this.productAttributeCombinationAmount = cart[this.props.productId]
            if(event.currentTarget.innerText === '+'){
                cart[this.props.productId] = this.productAttributeCombinationAmount + 1
                localStorage.setItem('cart', JSON.stringify(cart))
                this.props.changeCart(
                        cart
                )
            }else{
                if(this.productAttributeCombinationAmount === 1){
                    delete cart[this.props.productId] //cart operation
                    localStorage.setItem('cart', JSON.stringify(cart))
                    this.props.changeCart(
                            cart
                    )

                }else{
                    cart[this.props.productId] = this.productAttributeCombinationAmount - 1 //cart operation
                    localStorage.setItem('cart', JSON.stringify(cart))
                    this.props.changeCart(
                            cart
                    )
                }
            }
            
        }else{
            this.productAttributeCombinationAmount = cart[this.props.productId][JSON.stringify(this.props.attributeCombination)]
            if(event.currentTarget.innerText === '+'){
                cart[this.props.productId][JSON.stringify(this.props.attributeCombination)] = this.productAttributeCombinationAmount + 1
                localStorage.setItem('cart', JSON.stringify(cart))
                this.props.changeCart(
                        cart
                )
            }else{
                if(this.productAttributeCombinationAmount === 1){
                    delete cart[this.props.productId][JSON.stringify(this.props.attributeCombination)]
                    localStorage.setItem('cart', JSON.stringify(cart))
                    this.props.changeCart(
                            cart
                    )
                }else{
                    cart[this.props.productId][JSON.stringify(this.props.attributeCombination)] = this.productAttributeCombinationAmount - 1
                    localStorage.setItem('cart', JSON.stringify(cart))
                    this.props.changeCart(
                            cart
                    )
                }
            }
        }
        

    }

    render(){
        // console.log(typeof this.props.attributeCombination, 'number')
        this.attributeElements = []
        if(this.state.id){
            if(this.props.attributeCombination){
                Object.keys(this.props.attributeCombination).forEach((attributeId, index)=>{

                    this.attributeElements.push(
                        <Attribute key={index} changeable={false} selectedAttribute={this.props.attributeCombination[attributeId]} productId={this.state.id} attribute={this.state.attributes[index]} index={index}/>
                    )
                })
                // console.log(this.state.gallery)
                return(
                    <div className='cartItem'>
                        <div className="cartItemInfo">
                            {this.state.brandName && <div className="cartItemBrandName">{this.state.brandName}</div>}  
                            {this.state.productName && <div className="cartItemProductName">{this.state.productName}</div>}  
                            {this.state.prices && <div className="cartItemPrice">$50.00</div>}  
                            {this.state.attributes && <div className="cartItemAttributes">{this.attributeElements}</div>}  
                        </div>
                        <div className="cartItemQuantity">
                            <div className="cartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                            <div className="cartItemQuantityValue" >{this.props.amount}</div>
                            <div className="cartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                        </div>
                        <div className="cartItemGalleryContainer">
                            {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                        </div>
                    </div>
                )
            }
            return(
                <div className='cartItem' id={this.props.attributeCombination}>
                    <div className="cartItemInfo">
                        {this.state.brandName && <div className="cartItemBrandName">{this.state.brandName}</div>}  
                        {this.state.productName && <div className="cartItemProductName">{this.state.productName}</div>}  
                        {this.state.prices && <div className="cartItemPrice">$50.00</div>}
                    </div>
                    <div className="cartItemQuantity">
                        <div className="cartItemQuantityIncrease" onClick={this.handleCartQuantityChange}>+</div>
                        <div className="cartItemQuantityValue" >{this.props.amount}</div>
                        <div className="cartItemQuantityDecrease" onClick={this.handleCartQuantityChange}>-</div>
                    </div>
                    <div className="cartItemGalleryContainer">
                        {this.state.gallery && <CartItemGallery gallery={this.state.gallery}/>}
                    </div>
                </div>
            )
        }
    }
}