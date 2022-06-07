import { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom';
import Attribute from './Attribute';
import { Interweave } from 'interweave';
import {graphFetch} from './helpers'


class ProductDescription extends Component {
    constructor(props){
        super(props);

        this.mainImagePDPRef = createRef()
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleGalleryScroll = this.handleGalleryScroll.bind(this)
        this.handleClickGalleryImage = this.handleClickGalleryImage.bind(this)
        this.state = {
            galleryAtTop: true,
            galleryAtBottom: false,
            gallery: null,
            brandName: null,
            productName: null,
            attributes: null,
            prices: null,
            description: null,
        }
    }

    componentDidMount(){
        let productId = window.location.pathname.split('/product/')
        productId = productId[productId.length-1]

        let query = `
            query{
                product(id:"${productId}"){
                    id
                    name
                    inStock
                    gallery
                    description
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
                    description: data.description,
                    // put other data here
                }
            })
        })
    }

    handleGalleryScroll(event){
        if(event.target.parentElement.scrollTop){
            this.setState(()=>{
                
                return({
                    galleryAtTop: false
                })
            })
        }else{
            this.setState(()=>{
                return({
                    galleryAtTop: true
                })
            })
            
        }
        if(event.target.parentElement.scrollTop >= event.target.parentElement.scrollHeight-500){
            this.setState(()=>{
                return({
                    galleryAtBottom: true
                })
            })
        }else{
            this.setState(()=>{
                return({
                    galleryAtBottom: false
                })
            })
        }
        if(event.target.classList.contains('scrollUpGallery')){    
            event.target.parentElement.scrollBy(0,-50)
        }else{
            event.target.parentElement.scrollBy(0,50)
        }
    }

    handleClickGalleryImage(event){
        this.mainImagePDPRef.current.src = event.currentTarget.childNodes[0].src
    }

    handleAddToCart(event){
        //get a list of all attributes for the current item
        // save to this.props.cart as 
        /*
        cart = {
            productId: [
                {
                    {attributeNumber}: {attributeChoice as an Integer},
                    ...,
                    ... 
                },
                {
                    ...
                }
            ]
        }
        then save cart to localStorage
        */
        let activeSwatchAttributes = document.querySelectorAll('.attributeSwatchActive')
        let activeTextAttributes = document.querySelectorAll('.attributeTextActive')
        let activeAttributes = [...activeSwatchAttributes, ...activeTextAttributes]
        let selectedAttributesForCart = {}
        activeAttributes.forEach((attrib, index)=>{
            let parentId = attrib.parentElement.parentElement.id
            let id = attrib.id
            selectedAttributesForCart[parentId]=id
            // console.log(selectedAttributesForCart)
        })
        if(this.props.cart[`${this.state.id}`]){
            this.props.cart[`${this.state.id}`] = [
                ...this.props.cart[`${this.state.id}`],
                selectedAttributesForCart
            ]
        }else{
            this.props.cart[`${this.state.id}`] = [
                selectedAttributesForCart
            ]
        }
        let oldCart = localStorage.getItem('cart') // string
        oldCart = JSON.parse(oldCart) //Json
        oldCart = {
            ...oldCart,
            ...this.props.cart
        }
        oldCart = JSON.stringify(oldCart) //string
        localStorage.setItem('cart', oldCart)

    }

    render(){
        if(this.state.gallery){
            this.galleryImageElements = []
            this.state.gallery.forEach((galleryImageLink, index )=> {
                this.galleryImageElements.push(
                    <div className="galleryImageContainer" key={index} onClick={this.handleClickGalleryImage}>
                        <img src={galleryImageLink} className="galleryImage"/>
                    </div>
                )
            });
        }
        if(this.state.attributes){
            let productId = window.location.pathname.split('/product/')
            productId = productId[productId.length-1]
            this.attributeElements = []
            this.state.attributes.forEach((attribute, index)=>{
                this.attributeElements.push(<Attribute key={index} productId={productId} attribute={attribute} index={index}/>)
            })
        }
        if(this.state.prices){
            this.priceResult = this.state.prices.filter(price=>{
                return price.currency.symbol === this.props.currentCurrency;
            })
        }
        return (
            <div className="productDescriptionPortal">
                <div className="galleryPDP">
                    {this.galleryImageElements && this.galleryImageElements.length>3 && <div className={`scrollUpGallery ${this.state.galleryAtTop?"hideScrollButton":" "}`} onClick={this.handleGalleryScroll}>^</div>}
                    {this.galleryImageElements}
                    {this.galleryImageElements && this.galleryImageElements.length>3 && <div className={`scrollDownGallery ${this.state.galleryAtBottom?"hideScrollButton":" "}`} onClick={this.handleGalleryScroll}>^</div>}
                </div>
                <div className="mainImagePDP">
                    {this.state.gallery && <img className="mainImage" src={this.state.gallery[0]} ref={this.mainImagePDPRef}/>}
                </div>
                <div className="productDescriptionPDP">
                    <div className="productDescriptionPDPInner">
                        {this.state.brandName && <h2 className="brandNamePDP">{this.state.brandName}</h2>}
                        {this.state.productName && <p className="productNamePDP">{this.state.productName}</p>}
                        {this.state.attributes && 
                        <>
                            {this.attributeElements}
                        </> }
                        <p className="attributeName">PRICE:</p>
                        {this.state.prices && <p className="productPricePDP">{this.props.currentCurrency}{this.priceResult[0].amount}</p>}
                        <div className="addToCartLargeButton" onClick={this.handleAddToCart}>ADD TO CART</div>
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
