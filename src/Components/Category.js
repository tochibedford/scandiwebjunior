import React, { Component } from 'react'
import Product from '../Components/Product'
import {graphFetch} from './helpers'

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state={
            productElements: []
        }

    }

    componentDidMount(){

        let query = `
        query{
            category(input: { title: "${this.props.category.toLowerCase()}" }) {
                products {
                    id
                    name
                    inStock
                    gallery
                    prices{
                      currency{
                        label
                        symbol
                      }
                      amount
                    }
                }
            }
        }
        `
        graphFetch(query).then(data=>{
            this.productElements = []
            data.category.products.forEach(product=>{
                this.productElements.push(
                    <Product 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    inStock={product.inStock}
                    gallery={product.gallery}
                    prices={product.prices}
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


    render() {
        return (
        <div className="categoryContainer">
            <div className="categoryName">
                {this.props.category}
            </div>
            <div className="products">
                {this.state.productElements} 
            </div>
        </div>
        )
    }
}
