import { Component } from 'react'
import Navbar from './Components/Navbar'
import Category from './Components/Category'
import {categoriesQuery, graphFetch} from './Components/helpers'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import ProductDescription from './Components/ProductDescription'
import Cart from './Components/Cart'

export default class App extends Component{
    constructor(props){
        super(props);
        this.refreshBodyContainer = []
        this.changeCurrentCurrency = this.changeCurrentCurrency.bind(this)
        this.changeCart = this.changeCart.bind(this)
        this.changeTotal = this.changeTotal.bind(this)
        this.state = {
            currentCurrency: localStorage.getItem('currency')? localStorage.getItem('currency'):'$',
            category: null,
            categories: [],
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
            cartTotal: 0
        }
    }

    changeCart(newCart){
        this.setState((prevState)=>{
            return{
                cart: newCart 
            }
        })
    }

    changeCurrentCurrency(curr){
        this.setState(()=>{
            return {
                currentCurrency: curr
            }
        })
    }

    changeTotal(newValue){
        this.setState(()=>{
            return{cartTotal: newValue}
        })
    }

    componentDidMount(){
        
        graphFetch(categoriesQuery()).then(data=>{
            const categories = [];
            data.data.categories.forEach((category)=>{categories.push(category.name.charAt(0).toUpperCase()+category.name.slice(1))})
            this.setState(()=>{
                return({
                    category: categories[0],
                    categories: categories
                })
            })
        })
        
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/categories/all"></Redirect>
                        </Route>
                        <Route path="/categories/:category">
                            <Navbar changeCart={this.changeCart} cart={this.state.cart} currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={this.state.category} categories={this.state.categories}/>
                            {this.state.category && <Category changeCart={this.changeCart} cart={this.state.cart} currentCurrency = {this.state.currentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={ this.state.category }/>}
                        </Route>
                        <Route path="/product/:productid">
                            <Navbar changeCart={this.changeCart} cart={this.state.cart} currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={localStorage.getItem('category')?localStorage.getItem('category'):"all"} categories={this.state.categories}/>
                            {this.state.currentCurrency && <ProductDescription changeCart={this.changeCart} cart={this.state.cart} currentCurrency={this.state.currentCurrency} />}
                        </Route>
                        <Route path="/cart">
                            <Navbar changeCart={this.changeCart} cart={this.state.cart} currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={localStorage.getItem('category')?localStorage.getItem('category'):"all"} categories={this.state.categories}/>
                            {this.state.currentCurrency && <Cart changeTotal={this.changeTotal} currentCurrency={this.state.currentCurrency} changeCart={this.changeCart} cart={this.state.cart} /> }
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}