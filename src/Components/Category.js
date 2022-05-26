import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Product from '../Components/Product'
import {graphFetch} from './helpers'

class Category extends Component {
    constructor(props){
        super(props);
        this.refreshBody = this.refreshBody.bind(this)
        this.state={
            currentCategory: this.props.match.params.category,
            productElements: []
        }

    }

    refreshBody(){
        let cat = this.props.match.params.category
        // console.log(cat)
        let query = `
        query{
            category(input: { title: "${cat.toLowerCase()}" }) {
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

    componentDidMount(){
        let cat = this.props.match.params.category
        let query = `
        query{
            category(input: { title: "${cat.toLowerCase()}" }) {
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

    componentDidUpdate(){
        console.log(this.props.match.params.category)
    }

    render() {
        this.props.refreshBodyContainer.push(this.refreshBody)
        return (
            <div className="categoryContainer">
                <div className="categoryName">
                    {this.state.currentCategory}
                </div>
                <div className="products">
                    {this.state.productElements} 
                </div>
            </div>
        )
    }
}

export default withRouter(Category);