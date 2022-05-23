import React, { Component } from 'react'
import Product from '../Components/Product'

export default class Category extends Component {

    render() {
        return (
        <div className="categoryContainer">
            <div className="categoryName">
                {this.props.category}
            </div>
            <div className="products">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
        )
    }
}
