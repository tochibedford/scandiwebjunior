import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Product from '../Components/Product'
import {categoryQuery, graphFetch} from './helpers'

class Category extends Component {
    constructor(props){
        super(props);
        const {match} = this.props;
        this.refreshBody = this.refreshBody.bind(this)
        this.state={
            currentCategory: match.params.category,
            productElements: [],
            propertiesPDP: []
        }
        
    }

    refreshBody(cat){
        const {cart, changeCart, currentCurrency} = this.props;
        graphFetch(categoryQuery(cat)).then(data=>{
            this.productElements = []
            data.data.category.products.forEach(product=>{
                this.productElements.push(
                    <Product 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    inStock={product.inStock}
                    gallery={product.gallery}
                    brand={product.brand}
                    prices={product.prices}
                    cart = {cart}
                    changeCart={changeCart}
                    currentCurrency={currentCurrency}
                    />
                )
            })
            

            this.setState(()=>{
                return({
                    currentCategory: cat,
                    productElements: this.productElements
                })
            })
                

        })
        
    }

    componentDidMount(){
        const {refreshBodyContainer, match, cart, changeCart, currentCurrency} = this.props;
        refreshBodyContainer.push(this.refreshBody)
        const cat = match.params.category

        if(this.state.productElements.length === 0){
            graphFetch(categoryQuery(cat)).then(data=>{
                this.productElements = []
                data.data.category.products.forEach(product=>{
                    this.productElements.push(
                        <Product 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        inStock={product.inStock}
                        gallery={product.gallery}
                        brand={product.brand}
                        prices={product.prices}
                        attributes={product.attributes}
                        cart = {cart}
                        changeCart={changeCart}
                        currentCurrency={currentCurrency}
                        />
                    )
                })
    
                this.setState(()=>{
                    return({
                        productElements: this.productElements
                    })
                })
                    
    
            })
        }
    }
    

    render() {
        
        return (
            <div className="categoryContainer">
                <div className="categoryName">
                    {this.state.currentCategory.charAt(0).toUpperCase()+this.state.currentCategory.slice(1)}
                </div>
                <div className="products">
                    {this.state.productElements}
                </div>
                
            </div>
        )
    }
}

export default withRouter(Category);