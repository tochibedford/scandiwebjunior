import { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom';
import Attribute from './Attribute';
import { Interweave } from 'interweave';
import {graphFetch} from './helpers'


class ProductDescription extends Component {
    constructor(props){
        super(props);

        this.mainImagePDPRef = createRef()
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
        }if(event.target.parentElement.scrollTop >= 550){
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
        return (
            <div className="productDescriptionPortal">
                <div className="galleryPDP">
                    <div className={`scrollUpGallery ${this.state.galleryAtTop?"hideScrollButton":" "}`} onClick={this.handleGalleryScroll}>^</div>
                    {this.galleryImageElements}
                    <div className={`scrollDownGallery ${this.state.galleryAtBottom?"hideScrollButton":" "}`} onClick={this.handleGalleryScroll}>^</div>
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
                        {this.state.prices && <p className="productPricePDP">${this.state.prices[0].amount}</p>}
                        <div className="addToCartLargeButton">ADD TO CART</div>
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