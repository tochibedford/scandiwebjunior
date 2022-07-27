import { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom';
import Attribute from './Attribute';
import { Interweave } from 'interweave';
import {graphFetch, productWithDescriptionQuery} from './helpers'


class ProductDescription extends Component {
    constructor(props){
        super(props);

        this.mainImagePDPRef = createRef()
        this.productDescriptionRef = createRef()
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleClickGalleryImage = this.handleClickGalleryImage.bind(this)
        this.state = {
            gallery: null,
            brandName: null,
            productName: null,
            attributes: null,
            prices: null,
            description: null,
            inStock: null
        }
    }

    componentDidMount(){
        const locationList = window.location.pathname.split('/product/')
        const productId = locationList[locationList.length-1]

        
        graphFetch(productWithDescriptionQuery(productId)).then(data=>{
            data = data.data.product
            this.setState(()=>{
                return{
                    id: data.id,
                    gallery: data.gallery,
                    brandName: data.brand,
                    productName: data.name,
                    attributes: data.attributes,
                    prices: data.prices,
                    description: data.description,
                    inStock: data.inStock
                }
            })
        })
    }

    handleClickGalleryImage(event){
        this.mainImagePDPRef.current.src = event.currentTarget.childNodes[0].src
    }

    handleAddToCart(event){
        const {cart, changeCart} = this.props;
        if(!this.state.inStock){
            return
        }
        
        /*
        get a list of all attributes for the current item
        save to cart variable as:
        cart = {
            productId: {
                String(
                    Object({{attributeNumber}: {attributeChoice as an Integer}})
                    ): {amount},
                String(
                    Object({{attributeNumber}: {attributeChoice as an Integer}})
                    ): {amount},
            }
        }
        then save cart to localStorage

        this gives me the ability to not only check if a product is it the cart
        but also to check if a certain combination of its attributes already exists in the cart
        this is because I have converted the attribute combinations to strings like 
        cart = {
            "apple-imac-2021": {
                "{"0":"0","1":"1","2":"1"}": 2,
                "{"0":"0","1":"0","2":"1"}": 1,
                "{"0":"1","1":"0","2":"1"}": 1,
                "{"0":"1","1":"0","2":"0"}": 1,
                "{"0":"1","1":"1","2":"0"}": 1,
                "{"0":"1","1":"1","2":"1"}": 1
            },
            "apple-airtag": 2,
            "apple-airpods-pro": 3,
            "apple-iphone-12-pro": {
                "{"0":"1","1":"2"}": 1,
                "{"0":"1","1":"1"}": 1,
                "{"0":"1","1":"3"}": 1
            }
        }
        */
       
        if(this.state.attributes.length<1){
            cart[`${this.state.id}`]? cart[`${this.state.id}`]+= 1:cart[`${this.state.id}`]=1
            changeCart(
                cart
            )
            localStorage.setItem('cart',JSON.stringify(cart))
            
        }else{
            const activeSwatchAttributes = this.productDescriptionRef.current.querySelectorAll('.attributeSwatchActive')
            const activeTextAttributes = this.productDescriptionRef.current.querySelectorAll('.attributeTextActive')
            const activeAttributes = [...activeSwatchAttributes, ...activeTextAttributes]
            const selectedAttributesForCart = {}
            activeAttributes.forEach((attrib, index)=>{
                const parentId = attrib.parentElement.parentElement.id
                const id = attrib.id
                selectedAttributesForCart[parentId]=id
            })
            const selectedAttributesForCartString = JSON.stringify(selectedAttributesForCart)
            if(cart[`${this.state.id}`]){
                if(cart[`${this.state.id}`][selectedAttributesForCartString]){
                    cart[`${this.state.id}`][selectedAttributesForCartString] += 1 
                }else{
                    cart[`${this.state.id}`][selectedAttributesForCartString] = 1
                }
            }else{
                cart[`${this.state.id}`]={}
                cart[`${this.state.id}`][selectedAttributesForCartString]= 1
            }
            const oldCart = JSON.parse(localStorage.getItem('cart')) 
            const newCart = {
                ...oldCart,
                ...cart
            }
            changeCart(
                newCart
            )
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
        

    }

    render(){
        const {currentCurrency, inStock} = this.props;
        if(this.state.gallery){
            this.galleryImageElements = []
            this.state.gallery.forEach((galleryImageLink, index)=> {
                this.galleryImageElements.push(
                    <div className="galleryImageContainer" key={index} onClick={this.handleClickGalleryImage}>
                        <img src={galleryImageLink} className="galleryImage" alt="Product Description gallery element"/>
                    </div>
                )
            });
        }
        if(this.state.attributes){
            const locationList = window.location.pathname.split('/product/')
            const productId = locationList[locationList.length-1]
            this.attributeElements = []
            this.state.attributes.forEach((attribute, index)=>{
                this.attributeElements.push(<Attribute key={index} changeable={true} productId={productId} attribute={attribute} index={index}/>)
            })
        }
        if(this.state.prices){
            this.priceResult = this.state.prices.filter(price=>{
                return price.currency.symbol === currentCurrency;
            })
        }
        return (
            <div className="productDescriptionPortal">
                <div className="galleryPDP">
                    {this.galleryImageElements}
                </div>
                <div className="mainImagePDP">
                    {this.state.gallery && <img className="mainImage" src={this.state.gallery[0]} ref={this.mainImagePDPRef} alt="product description main"/>}
                    {!inStock && <div className="outOfStock">OUT OF STOCK</div>}
                </div>
                <div className="productDescriptionPDP" ref={this.productDescriptionRef}>
                    <div className="productDescriptionPDPInner">
                        {this.state.brandName && <h2 className="brandNamePDP">{this.state.brandName}</h2>}
                        {this.state.productName && <p className="productNamePDP">{this.state.productName}</p>}
                        {this.state.attributes && 
                        <>
                            {this.attributeElements}
                        </> }
                        <p className="attributeName">PRICE:</p>
                        {this.state.prices && <p className="productPricePDP">{currentCurrency}{this.priceResult[0].amount.toFixed(2)}</p>}
                        {this.state.inStock? <div className="addToCartLargeButton" onClick={this.handleAddToCart}>ADD TO CART</div>:
                        <div className="addToCartLargeButton disabledAddToCart" onClick={this.handleAddToCart}>OUT OF STOCK</div>}
                        <div className="productInterDescription">
                            <Interweave content={`${this.state.description}`}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductDescription)
